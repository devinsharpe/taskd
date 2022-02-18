import { Variant, Variants, motion } from "framer-motion";

import React from "react";

const container = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeIn",
      staggerChildren: 0.5,
    },
  },
} as Variants;

const children = {
  initial: {
    opacity: 0,
    scale: 1,
  },
  visible: {
    opacity: [1, 0.75, 0.5],
    scale: [1, 1.1, 1.05, 0.95, 0.9],
  },
  transition: {
    duration: 1.5,
    ease: "easeInOut",
    repeat: Infinity,
  },
} as Variants;

export interface LoaderProps {
  className?: string;
  dotClassName?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const Loader: React.FC<LoaderProps> = ({ className, dotClassName, size }) => {
  return (
    <motion.div
      variants={container}
      initial="initial"
      animate="visible"
      exit="initial"
      className={`${size === "sm" ? "space-x-1" : ""} ${
        size === "md" ? "space-x-2" : ""
      } ${size === "lg" ? "space-x-3" : ""} ${
        size === "xl" ? "space-x-4" : ""
      }  flex items-center py-2 ${className || ""}`}
    >
      <motion.div
        variants={children}
        transition={children.transition}
        className={`${size === "sm" ? "w-2 h-2" : ""} ${
          size === "md" ? "w-4 h-4" : ""
        } ${size === "lg" ? "w-6 h-6" : ""} ${
          size === "xl" ? "w-8 h-8" : ""
        }  rounded-full bg-current ${dotClassName}`}
      />
      <motion.div
        variants={children}
        transition={children.transition}
        className={`${size === "sm" ? "w-2 h-2" : ""} ${
          size === "md" ? "w-4 h-4" : ""
        } ${size === "lg" ? "w-6 h-6" : ""} ${
          size === "xl" ? "w-8 h-8" : ""
        }  rounded-full bg-current ${dotClassName}`}
      />
      <motion.div
        variants={children}
        transition={children.transition}
        className={`${size === "sm" ? "w-2 h-2" : ""} ${
          size === "md" ? "w-4 h-4" : ""
        } ${size === "lg" ? "w-6 h-6" : ""} ${
          size === "xl" ? "w-8 h-8" : ""
        }  rounded-full bg-current ${dotClassName}`}
      />
    </motion.div>
  );
};

Loader.defaultProps = { dotClassName: "bg-white dark:bg-zinc-800", size: "md" };

export default Loader;
