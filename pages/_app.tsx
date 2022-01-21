import "../public/tailwind.css";

import { useEffect, useState } from "react";

import { Account } from "../models";
import AccountNav from "../components/account-nav";
import type { AppProps } from "next/app";
import ThemeToggle from "../components/theme-toggle";
import Toaster from "../components/toaster";
import { User } from "@supabase/supabase-js";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";
import { useUserStore } from "../store";

export enum SoundEffects {
  clickError = "sound-click-error",
  clickSelect = "sound-click-select",
}

function MyApp({ Component, pageProps }: AppProps) {
  const [hideDarkModeToggle, setHideDarkModeToggle] = useState(false);
  const { user, setAccount, setUser } = useUserStore((state) => ({
    user: state.user,
    setAccount: state.setAccount,
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
    if (isAuthPage) {
      window.document.querySelector("html")?.classList.add("pattern");
    } else {
      window.document.querySelector("html")?.classList.remove("pattern");
    }
    if (!user && !isAuthPage) {
      fetch("/api/auth/user")
        .then(async (res) => {
          if (res.ok) {
            const userData: User = await res.json();
            if (userData) {
              const { data: accountData, error } = await supabase
                .from<Account>("accounts")
                .select("*")
                .eq("user", userData.id)
                .single();
              if (accountData) {
                setAccount(accountData);
              }
            }
            setUser(userData);
          } else {
            setUser(null);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router.pathname, user, setUser, setAccount]);

  return (
    <>
      <audio
        src="/sounds/mixkit-click-error-1110.wav"
        autoPlay={false}
        id="sound-click-error"
      />
      <audio
        src="/sounds/mixkit-select-click-1109.wav"
        autoPlay={false}
        id="sound-click-select"
      />
      <Component {...pageProps} />
      <Toaster />
      <AccountNav />
      <div className="fixed bottom-4 right-4">
        <ThemeToggle isHidden={hideDarkModeToggle} />
      </div>
    </>
  );
}

export default MyApp;
