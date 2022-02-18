import "../public/tailwind.css";

import { PostgrestError, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useToastStore, useTogglStore, useUserStore } from "../store";

import { Account } from "../types/models";
import AccountDetailsForm from "../components/account-details-form";
import AccountNav from "../components/account-nav";
import type { AppProps } from "next/app";
import Modal from "../components/modal";
import ThemeToggle from "../components/theme-toggle";
import Toaster from "../components/toaster";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";
import useToggl from "../hooks/useToggl";

export enum SoundEffects {
  interfaceClose = "interface-close",
  interfaceError = "interface-error",
  interfaceOpen = "interface-open",
  interfaceSuccess = "interface-success",
}

function MyApp({ Component, pageProps }: AppProps) {
  const [isAuthPage, setIsAuthPage] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isSavingAccount, setIsSavingAccount] = useState(false);
  const { account, user, setAccount, setUser } = useUserStore((state) => ({
    account: state.account,
    user: state.user,
    setAccount: state.setAccount,
    setUser: state.setUser,
  }));
  const { pushToast } = useToastStore((state) => ({ pushToast: state.push }));
  const { authenticate } = useToggl();
  const { setTogglUser } = useTogglStore((state) => ({
    setTogglUser: state.setTogglUser,
  }));

  const router = useRouter();
  if (typeof window !== "undefined") {
    if (
      router.pathname !== "reset" &&
      window.location.href.includes("type=recovery")
    ) {
      const queryIndex = window.location.href.indexOf("#");
      router.push(`/reset/?${window.location.href.slice(queryIndex + 1)}`);
    }
  }

  useEffect(() => {
    const isAuth = ["/signin", "/signup", "/reset", "/forget", "/"].includes(
      router.pathname
    );
    if (isAuth) {
      window.document.querySelector("html")?.classList.add("pattern");
    } else {
      window.document.querySelector("html")?.classList.remove("pattern");
    }
    if (!user && !isAuth) {
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
                const togglUser = await authenticate(
                  accountData.togglToken,
                  true
                );
                if (togglUser) {
                  setTogglUser(togglUser);
                }
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
    setIsAuthPage(isAuth);
  }, [router.pathname, user, setUser, setAccount, authenticate, setTogglUser]);

  const handleError = (error: PostgrestError) => {
    pushToast({
      title: "Something went wrong",
      description: error.message,
      duration: 10000,
      isClosable: true,
      status: "ERROR",
    });
  };

  const handleAccountData = async (data: Account[]) => {
    setAccount(data![0]);
    const togglUser = await authenticate(data![0].togglToken);
    setTogglUser(togglUser!);
    setIsAccountModalOpen(false);
  };

  const handleAccountFormSubmit = async (formData: {
    lastName: string;
    firstName: string;
    togglToken: string;
  }) => {
    if (user) {
      setIsSavingAccount(true);

      if (account) {
        const { data, error } = await supabase
          .from<Account>("accounts")
          .update({ ...formData })
          .match({ id: account.id });
        if (error) handleError(error);
        if (data) await handleAccountData(data);
      } else {
        const { data, error } = await supabase
          .from<Account>("accounts")
          .insert({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: user!.email,
            togglToken: formData.togglToken,
            user: user!.id,
          });
        if (error) handleError(error);
        if (data) await handleAccountData(data);
      }
      setIsSavingAccount(true);
    }
  };

  return (
    <>
      <audio
        src="/sounds/interface-close.wav"
        autoPlay={false}
        id="interface-close"
      />
      <audio
        src="/sounds/interface-error.wav"
        autoPlay={false}
        id="interface-error"
      />
      <audio
        src="/sounds/interface-open.wav"
        autoPlay={false}
        id="interface-open"
      />
      <audio
        src="/sounds/interface-success.wav"
        autoPlay={false}
        id="interface-success"
      />
      {account || isAuthPage ? <Component {...pageProps} /> : <></>}
      <Modal
        title="Account Details"
        isClosable={Boolean(account)}
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
      >
        <AccountDetailsForm
          account={account ? account : undefined}
          user={user!}
          onSubmit={handleAccountFormSubmit}
          isLoading={isSavingAccount}
        />
      </Modal>
      <Toaster />
      <AccountNav
        handleAccountSettingsClick={() => setIsAccountModalOpen(true)}
      />

      <div className="fixed bottom-4 right-4">
        <ThemeToggle isHidden={!isAuthPage} />
      </div>
    </>
  );
}

export default MyApp;
