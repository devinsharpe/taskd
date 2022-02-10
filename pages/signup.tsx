import React, { FormEventHandler, useState } from "react";

import Button from "../components/button";
import Link from "next/link";
import type { NextPage } from "next";
import { Toast } from "../store/toast";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";
import { useToastStore } from "../store";

const SignUp: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { pushToast } = useToastStore((state) => ({ pushToast: state.push }));
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (email && password && passwordConfirm && password == passwordConfirm) {
      setIsLoading(true);
      supabase.auth.user;
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        pushToast({
          title: "Something went wrong.",
          message: error.message,
          duration: 10000,
          isClosable: true,
          status: "ERROR",
        } as Toast);
        setIsLoading(false);
      } else {
        router.push({
          pathname: "/signin",
          query: {
            email: email,
          },
        });
      }
    } else {
      pushToast({
        title: "Missing Credentials",
        description:
          "Please fill out the email, password, and confirmation fields. Ensure that the password and confirmation fields match.",

        duration: 10000,
        isClosable: true,
        status: "ERROR",
      } as Toast);
    }
  };

  return (
    <main className="flex items-center justify-center w-full h-screen">
      <article className="w-4/5 md:w-2/5 card xl:w-1/5">
        <header className="flex flex-col items-center">
          <hgroup className="mb-0 text-center">
            <h2 className="text-2xl font-bold">Let&apos;s Get Started.</h2>
            <h1>Task&apos;d</h1>
          </hgroup>
        </header>
        <form onSubmit={handleSubmit} className="space-y-4">
          <fieldset className="group">
            <label htmlFor="account-email">Email Address</label>
            <input
              type="email"
              name="account-email"
              id="account-email"
              placeholder="jane.doe@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </fieldset>
          <fieldset className="group">
            <label htmlFor="account-password">Password</label>
            <input
              type="password"
              name="account-password"
              id="account-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              placeholder="SuperSecurePassword1234#"
            />
          </fieldset>
          <fieldset className="group">
            <label htmlFor="account-confirm-password">Confirm Password</label>
            <input
              type="password"
              name="account-confirm-password"
              id="account-confirm-password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              disabled={isLoading}
              placeholder="SuperSecurePassword1234#"
            />
          </fieldset>
          <Button
            type="submit"
            className="w-full"
            scaleOnHover
            isLoading={isLoading}
          >
            Sign Up
          </Button>
          <div className="flex items-center justify-center w-full">
            <Link href="/signin/" passHref>
              <a className="link">Already have an account?</a>
            </Link>
          </div>
        </form>
      </article>
    </main>
  );
};

export default SignUp;
