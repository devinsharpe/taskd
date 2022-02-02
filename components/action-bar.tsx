import { AnimatePresence, Variants, motion } from "framer-motion";
import React, { useState } from "react";
import {
  UilBars,
  UilCalendarAlt,
  UilClipboard,
  UilDiary,
  UilStopwatch,
  UilTimes,
  UilUsersAlt,
} from "@iconscout/react-unicons";

import { SoundEffects } from "../pages/_app";
import useSoundEffect from "../hooks/useSoundEffect";

const variants = {
  hidden: {
    y: 64,
  },
  visible: {
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
} as Variants;

const taskBtnVariants = {
  hidden: {
    x: 0,
    y: 0,
    opacity: 0,
  },
  pos1: {
    x: "-150%",
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  pos2: {
    x: "-105%",
    y: "-105%",
    opacity: 1,
    transition: {
      delay: 0.05,
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  pos3: {
    x: 0,
    y: "-145%",
    opacity: 1,
    transition: {
      delay: 0.1,
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  pos4: {
    x: "105%",
    y: "-105%",
    opacity: 1,
    transition: {
      delay: 0.15,
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  pos5: {
    x: "150%",
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.15,
      duration: 0.2,
      ease: "easeInOut",
    },
  },
} as Variants;

export enum Actions {
  client = "CLIENT",
  event = "EVENT",
  project = "PROJECT",
  task = "TASK",
  timeEntry = "TIME_ENTRY",
}

interface ActionBarProps {
  handleActionRequest: (action: Actions) => void;
}

const ActionBar: React.FC<ActionBarProps> = ({ handleActionRequest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { playSoundEffect } = useSoundEffect();

  return (
    <>
      <motion.button
        variants={variants}
        initial="hidden"
        animate="visible"
        className="fixed left-0 right-0 z-20 flex items-center justify-center p-4 mx-auto bg-white border-2 rounded-full shadow-lg dark:text-white dark:bg-zinc-800 aspect-square focus:outline-none bottom-4 focus:ring-4 hover:text-zinc-600 dark:hover:text-zinc-400 focus:text-zinc-600 dark:focus:text-zinc-400 focus:ring-zinc-600/50 dark:focus:ring-zinc-400/50 focus:border-zinc-600 dark:focus:border-zinc-400"
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
        <AnimatePresence>
          {isOpen ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                rotate: 720,
                transition: {
                  duration: 0.2,
                },
              }}
              exit={{ opacity: 0 }}
            >
              <UilTimes />
            </motion.p>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                rotate: 360,
                transition: { duration: 0.2 },
              }}
              exit={{ opacity: 0 }}
            >
              <UilBars />
            </motion.p>
          )}
        </AnimatePresence>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              variants={taskBtnVariants}
              initial="hidden"
              animate="pos1"
              exit="hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ originX: 0.5, originY: 0.5 }}
              className="fixed left-0 right-0 z-10 flex items-center justify-center p-4 mx-auto bg-white border-2 rounded-full shadow-md dark:text-white dark:bg-zinc-800 aspect-square focus:outline-none focus:border-blue-400 dark:focus:border-blue-400 bottom-4 focus:ring-4 focus:ring-blue-400/50 hover:text-blue-600 dark:hover:text-blue-400 focus:text-blue-600 dark:focus:text-blue-400"
              onClick={() => handleActionRequest(Actions.task)}
            >
              <UilClipboard />
            </motion.button>
            <motion.button
              variants={taskBtnVariants}
              initial="hidden"
              animate="pos2"
              exit="hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ originX: 0.5, originY: 0.5 }}
              className="fixed left-0 right-0 z-10 flex items-center justify-center p-4 mx-auto bg-white border-2 rounded-full shadow-md dark:text-white dark:bg-zinc-800 aspect-square focus:outline-none focus:border-violet-400 dark:focus:border-violet-400 bottom-4 focus:ring-4 focus:ring-violet-400/50 hover:text-violet-600 dark:hover:text-violet-400 focus:text-violet-600 dark:focus:text-violet-400"
              onClick={() => handleActionRequest(Actions.timeEntry)}
            >
              <UilStopwatch />
            </motion.button>
            <motion.button
              variants={taskBtnVariants}
              initial="hidden"
              animate="pos3"
              exit="hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ originX: 0.5, originY: 0.5 }}
              className="fixed left-0 right-0 z-10 flex items-center justify-center p-4 mx-auto bg-white border-2 rounded-full shadow-md dark:text-white dark:bg-zinc-800 aspect-square focus:outline-none focus:border-emerald-400 dark:focus:emerald-400 bottom-4 focus:ring-4 focus:ring-emerald-400/50 hover:text-emerald-600 dark:hover:text-emerald-400 focus:text-emerald-600 dark:focus:text-emerald-400"
              onClick={() => handleActionRequest(Actions.project)}
            >
              <UilDiary />
            </motion.button>
            <motion.button
              variants={taskBtnVariants}
              initial="hidden"
              animate="pos4"
              exit="hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ originX: 0.5, originY: 0.5 }}
              className="fixed left-0 right-0 z-10 flex items-center justify-center p-4 mx-auto bg-white border-2 rounded-full shadow-md dark:text-white dark:bg-zinc-800 aspect-square focus:outline-none focus:border-amber-400 dark:focus:border-amber-400 bottom-4 focus:ring-4 focus:ring-amber-400/50 hover:text-amber-600 dark:hover:text-amber-400 focus:text-amber-600 dark:focus:text-amber-400"
              onClick={() => handleActionRequest(Actions.client)}
            >
              <UilUsersAlt />
            </motion.button>
            <motion.button
              variants={taskBtnVariants}
              initial="hidden"
              animate="pos5"
              exit="hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ originX: 0.5, originY: 0.5 }}
              className="fixed left-0 right-0 z-10 flex items-center justify-center p-4 mx-auto bg-white border-2 rounded-full shadow-md dark:text-white dark:bg-zinc-800 aspect-square focus:outline-none focus:border-teal-400 dark:focus:border-teal-400 bottom-4 focus:ring-4 focus:ring-teal-400/50 hover:text-teal-600 dark:hover:text-teal-400 focus:text-teal-600 dark:focus:text-teal-400"
              onClick={() => handleActionRequest(Actions.event)}
            >
              <UilCalendarAlt />
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </>

    // <motion.section
    //   className="fixed bottom-0 left-0 right-0 flex items-center justify-center w-48 p-4 mx-auto space-x-4 bg-white rounded-t-lg shadow-lg dark:bg-zinc-800 md:w-96"
    //   variants={variants}
    //   initial="hidden"
    //   animate="visible"
    // >
    //   {/* <input
    //     type="text"
    //     className="pr-12"
    //     placeholder="What needs to get done?"
    //   /> */}
    //   <button className="absolute p-1 rounded dark:text-white text-zinc-800 right-2">
    //     <UilBars />
    //   </button>
    // </motion.section>
  );
};

export default ActionBar;
