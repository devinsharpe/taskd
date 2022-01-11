import "../public/tailwind.css";

import { useEffect, useState } from "react";

import type { AppProps } from "next/app";
import DarkModeToggle from "../components/dark-mode-toggle";
import Toaster from "../components/toaster";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const [hideDarkModeToggle, setHideDarkModeToggle] = useState(false);
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
    setHideDarkModeToggle(
      !["/signin", "/signup", "/reset", "/forget", "/"].includes(
        router.pathname
      )
    );
  }, [router.pathname]);

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
