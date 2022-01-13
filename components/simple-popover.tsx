import { AnimatePresence, Variants, motion } from "framer-motion";
import React, { ReactElement, useEffect, useRef, useState } from "react";

interface SimplePopoverProps {
  buttonNode: ReactElement<any>;
}

const variants = {
  initial: {
    opacity: 0,
    width: 0,
    padding: 0,
  },
  visible: {
    opacity: 1,
    width: "auto",
    padding: ".5rem",
    transition: {
      duration: 0.1,
      ease: "easeInOut",
    },
  },
} as Variants;

const SimplePopover: React.FC<SimplePopoverProps> = ({
  buttonNode,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [side, setSide] = useState<"left" | "right">("left");
  const boundingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boundingRef.current && typeof window !== "undefined") {
      setSide(
        window.innerWidth / 2 > boundingRef.current.getBoundingClientRect().x
          ? "left"
          : "right"
      );
    }
  }, [boundingRef]);

  return (
    <div
      className="relative z-20 flex items-center justify-center"
      ref={boundingRef}
    >
      {React.cloneElement(buttonNode, {
        onFocus: () => setIsOpen(true),
        onBlur: () => setIsOpen(false),
      })}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="popover-body"
            variants={variants}
            initial="initial"
            animate="visible"
            exit="initial"
            className={`absolute top-0 z-10 p-2 overflow-hidden bg-zinc-50 border border-zinc-100 dark:border-zinc-600 rounded-lg shadow-md dark:bg-zinc-700 dark:text-white whitespace-nowrap ${
              side === "left" ? "left-full ml-2" : "right-full mr-2"
            }`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SimplePopover;
