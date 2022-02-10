import { FormEventHandler, useEffect, useState } from "react";
import { useToastStore, useTogglStore, useUserStore } from "../store";

import { Account } from "../types/models";
import Button from "../components/button";
import Link from "next/link";
import { NextPage } from "next";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";
import useToggl from "../hooks/useToggl";

const SignIn: NextPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authenticate } = useToggl();
  const { pushToast } = useToastStore((state) => ({ pushToast: state.push }));
  const { setTogglUser } = useTogglStore((state) => ({
    setTogglUser: state.setTogglUser,
  }));
  const { setAccount, setUser } = useUserStore((state) => ({
    setAccount: state.setAccount,
    setUser: state.setUser,
  }));

  useEffect(() => {
    if (router.query.email) {
      setEmail(router.query.email as string);
    }
  }, [router.query.email]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async function (e) {
    e.preventDefault();

    if (email && password) {
      setIsLoading(true);
      const { user, session, error } = await supabase.auth.signIn({
        email,
        password,
      });
      if (error) {
        pushToast({
          title: "That's not right.",
          description: error.message,
          duration: 10000,
          isClosable: true,
          status: "ERROR",
        });
        setIsLoading(false);
      } else {
        setUser(user!);
        const { data, error } = await supabase
          .from<Account>("accounts")
          .select("firstName, lastName, email, created_at, togglToken")
          .eq("user", user!.id);
        if (data) {
          setAccount(data[0]);
          const togglUser = await authenticate(data[0].togglToken, true);
          if (togglUser) {
            setTogglUser(togglUser);
          }
        } else if (error) {
          console.log(error);
          setAccount(null);
        } else {
          setAccount(null);
        }
        await fetch("/api/auth/set", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event: "SIGNED_IN", session }),
        });
        router.push("/home");
      }
    } else {
      pushToast({
        title: "Missing Credentials",
        description:
          "Please enter a valid email and password. Otherwise, we can't sign you into your account.",
        duration: 10000,
        isClosable: true,
        status: "ERROR",
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="flex items-center justify-center w-full h-screen container-fluid">
        <article className="w-4/5 card md:w-2/5 xl:w-1/5">
          <header className="flex flex-col items-center">
            <hgroup className="mb-0 text-center">
              <h2 className="text-2xl font-bold">
                Hey There! Sign Back In Please.
              </h2>
              <h1>Task&apos;d</h1>
            </hgroup>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            <fieldset className="transition-colors duration-150 group">
              <label htmlFor="account-email">Email Address</label>
              <input
                type="email"
                name="account-email"
                id="account-email"
                placeholder="jane.doe@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
            <fieldset className="transition-colors duration-150 group">
              <label htmlFor="account-password">Password</label>
              <input
                type="password"
                name="account-password"
                id="account-password"
                className="rounded-lg border-slate-400"
                placeholder="SuperSecurePassword1234#"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
            <Button
              type="submit"
              isLoading={isLoading}
              scaleOnHover={true}
              className="w-full"
            >
              Login
            </Button>

            <div className="items-center justify-between w-full space-y-1 md:flex md:space-y-0">
              <Link href="/forgot/" passHref>
                <a className="block text-center link md:inline-block">
                  Forgot Password?
                </a>
              </Link>
              <Link href="/signup/" passHref>
                <a className="block text-center link md:inline-block">
                  Need an Account?
                </a>
              </Link>
            </div>
          </form>
        </article>
      </main>
    </>
  );
};

export default SignIn;
