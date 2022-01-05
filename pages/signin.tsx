import Button from "../components/button";
import Link from "next/link";
import { NextPage } from "next";
import { useState } from "react";

const SignIn: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <main className="flex items-center justify-center w-full h-screen container-fluid">
        <article className="w-4/5 card md:w-2/5">
          <header className="flex flex-col items-center">
            <hgroup className="mb-0 text-center">
              <h2 className="text-2xl font-bold">
                Hey There! Sign Back In Please.
              </h2>
              <h1>Task&apos;d</h1>
            </hgroup>
          </header>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <fieldset className="transition-colors duration-150 group">
              <label htmlFor="account-email">Email Address</label>
              <input
                type="email"
                name="account-email"
                id="account-email"
                placeholder="jane.doe@email.com"
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

            <div className="items-center justify-between w-full md:flex">
              <Link href="/forgot/" passHref>
                <a className="link">Forgot Password?</a>
              </Link>
              <Link href="/signup/" passHref>
                <a className="link">Need an Account?</a>
              </Link>
            </div>
          </form>
        </article>
      </main>
    </>
  );
};

export default SignIn;
