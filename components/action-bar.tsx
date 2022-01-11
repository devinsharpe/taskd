import { Variants, motion } from "framer-motion";

import React from "react";
import { UilBars } from "@iconscout/react-unicons";

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

const ActionBar = () => {
  return (
    <motion.section
      className="fixed left-0 right-0 flex items-center justify-center w-48 mx-auto space-x-4 bg-white rounded-lg shadow-lg bottom-4 dark:bg-zinc-900 md:w-96"
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      <input
        type="text"
        className="pr-12"
        placeholder="What needs to get done?"
      />
      <button className="absolute p-1 rounded dark:text-white text-zinc-800 right-2">
        <UilBars />
      </button>
    </motion.section>
  );
};

export default ActionBar;
