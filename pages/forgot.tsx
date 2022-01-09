import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEventHandler, useState } from "react";
import Button from "../components/button";
import { useToastStore } from "../store";
import { Toast } from "../store/toast";
import { supabase } from "../utils/supabaseClient";

const ForgotPassword: NextPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { pushToast } = useToastStore((state) => ({ pushToast: state.push }));
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (email) {
      setIsLoading(true);
      const { error } = await supabase.auth.api.resetPasswordForEmail(email);
      if (error) {
        pushToast({
          title: "Something went wrong",
          description: error.message,
          duration: 10000,
          isClosable: true,
          status: "ERROR",
        } as Toast);
        setIsLoading(false);
      } else {
        pushToast({
          title: "Recovery Email Sent",
          description: "Please check your email inbox for a recovery link.",
          duration: 10000,
          isClosable: true,
          status: "SUCCESS",
        } as Toast);
        router.push("/signin/");
      }
    }
  };

  return (
    <main className="flex items-center justify-center w-full h-screen container-fluid">
      <article className="w-4/5 card md:w-1/2">
        <header className="flex flex-col items-center">
          <hgroup className="mb-0 text-center">
            <h2 className="text-2xl font-bold">
              Let&apos;s Find Your Account.
            </h2>
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
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <Button
            type="submit"
            className="w-full"
            scaleOnHover
            isLoading={isLoading}
          >
            Recover Account
          </Button>
        </form>
        <div className="flex items-center justify-center pt-1">
          <Link href="/signin/" passHref>
            <a className="link">Already have an account?</a>
          </Link>
        </div>
      </article>
    </main>
  );
};

export default ForgotPassword;
