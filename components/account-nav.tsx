import { AnimatePresence, Variants, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import {
  UilMoon,
  UilSetting,
  UilSignOutAlt,
  UilSun,
  UilVolume,
  UilVolumeMute,
} from "@iconscout/react-unicons";
import { useThemeStore, useUserStore } from "../store";

import { SoundEffects } from "../pages/_app";
import { useRouter } from "next/router";
import useSoundEffect from "../hooks/useSoundEffect";

const variants = {
  initial: {
    opacity: 0,
    width: 0,
    height: 0,
    padding: 0,
  },
  visible: {
    padding: ".5rem",
    width: "max-content",
    height: "max-content",
    opacity: 1,
    transition: {
      duration: 0.125,
      ease: "easeInOut",
      delayChildren: 0.125,
      staggerChildren: 0.125,
    },
  },
} as Variants;

const childrenVariants = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const buttonVariants = {
  initial: { opacity: 0, scale: 0.75 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const AccountNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSoundDisabled, setIsSoundDisabled] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<number>(0);
  const { account, setAccount, setUser } = useUserStore((state) => ({
    account: state.account,
    setAccount: state.setAccount,
    setUser: state.setUser,
  }));
  const { theme, toggleTheme } = useThemeStore((state) => ({
    theme: state.theme,
    toggleTheme: state.toggleTheme,
  }));

  const settingsRef = useRef<HTMLButtonElement>(null);
  const themeRef = useRef<HTMLButtonElement>(null);
  const volumeRef = useRef<HTMLButtonElement>(null);
  const signoutRef = useRef<HTMLButtonElement>(null);

  const { playSoundEffect } = useSoundEffect();
  const router = useRouter();

  useEffect(() => {
    if (isOpen && typeof window !== "undefined") {
      const storedSoundSetting = localStorage.getItem("taskd-disable-sound") as
        | "true"
        | "false"
        | null;
      if (storedSoundSetting) {
        setIsSoundDisabled(JSON.parse(storedSoundSetting));
      }
      if (settingsRef.current) {
        settingsRef.current.focus();
      }
      setCloseTimeout(
        window.setTimeout(() => {
          setIsOpen(false);
        }, 10000)
      );
    }
  }, [isOpen, setCloseTimeout]);

  const toggleSoundSetting = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "taskd-disable-sound",
        JSON.stringify(!isSoundDisabled)
      );
    }
    setIsSoundDisabled(!isSoundDisabled);
  };

  const signout = async () => {
    const res = await fetch("/api/auth/remove");
    if (res.ok) {
      setCloseTimeout(0);
      setIsOpen(false);
      setAccount(null);
      setUser(null);
      router.push("/signin");
    }
  };

  if (account) {
    return (
      <nav className="fixed top-4 right-4">
        <motion.button
          variants={buttonVariants}
          initial="initial"
          animate="visible"
          className="z-20 flex items-center justify-center p-4 bg-white border-2 rounded-full shadow-lg dark:bg-zinc-800 aspect-square focus:outline-none focus:border-black dark:focus:border-white"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            if (isOpen) {
              playSoundEffect(SoundEffects.clickError);
            } else {
              playSoundEffect(SoundEffects.clickSelect);
            }
            setIsOpen(!isOpen);
          }}
        >
          <p className="font-semibold">
            {`${account.firstName.charAt(0)}${account.lastName.charAt(
              0
            )}`.toUpperCase()}
          </p>
        </motion.button>
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              variants={variants}
              initial="initial"
              animate="visible"
              exit="initial"
              className="z-10 absolute hover:border-black dark:hover:border-white dark:border-zinc-500 top-0 right-0 p-2 bg-white dark:bg-zinc-800 border-2 rounded-lg shadow-lg mt-[4.25rem] whitespace-nowrap dark:text-white overflow-hidden space-y-2"
            >
              <motion.li variants={childrenVariants}>
                <button
                  className="flex items-center w-full p-2 space-x-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-500 focus:ring-2 focus:ring-zinc-300 focus:outline-none dark:focus:ring-zinc-500"
                  ref={settingsRef}
                >
                  <UilSetting />
                  <span>Account Settings</span>
                </button>
              </motion.li>
              <motion.li variants={childrenVariants}>
                <button
                  className="flex items-center w-full p-2 space-x-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-500 focus:ring-2 focus:ring-zinc-300 focus:outline-none dark:focus:ring-zinc-500"
                  onClick={() => toggleTheme()}
                  ref={themeRef}
                >
                  {theme === "dark" ? <UilMoon /> : <UilSun />}
                  <span>Color Theme</span>
                </button>
              </motion.li>
              <motion.li variants={childrenVariants}>
                <button
                  className="flex items-center w-full p-2 space-x-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-500 focus:ring-2 focus:ring-zinc-300 focus:outline-none dark:focus:ring-zinc-500"
                  ref={volumeRef}
                  onClick={toggleSoundSetting}
                >
                  {isSoundDisabled ? <UilVolumeMute /> : <UilVolume />}
                  <span>Sound Effects</span>
                </button>
              </motion.li>
              <motion.li variants={childrenVariants}>
                <button
                  className="flex items-center w-full p-2 space-x-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-500 focus:ring-2 focus:ring-zinc-300 focus:outline-none dark:focus:ring-zinc-500"
                  onClick={() => signout()}
                  ref={signoutRef}
                >
                  <UilSignOutAlt />
                  <span>Sign Out</span>
                </button>
              </motion.li>
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    );
  } else {
    return <></>;
  }
};

export default AccountNav;
