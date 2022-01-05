import "../public/tailwind.css";

import type { AppProps } from "next/app";
import DarkModeToggle from "../components/dark-mode-toggle";
import Toaster from "../components/toaster";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster />
      <div className="fixed bottom-4 right-4">
        <DarkModeToggle />
      </div>
    </>
  );
}

export default MyApp;
