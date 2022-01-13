import "../public/tailwind.css";

import { useEffect, useState } from "react";

import type { AppProps } from "next/app";
import DarkModeToggle from "../components/dark-mode-toggle";
import Toaster from "../components/toaster";
import { User } from "@supabase/supabase-js";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";
import { useUserStore } from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  const [hideDarkModeToggle, setHideDarkModeToggle] = useState(false);
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const router = useRouter();
  if (typeof window !== "undefined") {
    console.log(router.pathname);
    if (
      router.pathname !== "reset" &&
      window.location.href.includes("type=recovery")
    ) {
      const queryIndex = window.location.href.indexOf("#");
      router.push(`/reset/?${window.location.href.slice(queryIndex + 1)}`);
    }
  }

  useEffect(() => {
    const isAuthPage = [
      "/signin",
      "/signup",
      "/reset",
      "/forget",
      "/",
    ].includes(router.pathname);
    setHideDarkModeToggle(!isAuthPage);
    if (!user && !isAuthPage) {
      fetch("/api/auth/user")
        .then(async (res) => {
          if (res.ok) {
            const data: User = await res.json();
            setUser(data);
          } else {
            setUser(null);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router.pathname, user, setUser]);

  return (
    <>
      <Component {...pageProps} />
      <Toaster />
      <div className="fixed bottom-4 right-4">
        <DarkModeToggle isHidden={hideDarkModeToggle} />
      </div>
    </>
  );
}

export default MyApp;
