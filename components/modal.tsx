import { AnimatePresence, Variants, motion } from "framer-motion";

import React from "react";
import { UilTimes } from "@iconscout/react-unicons";

interface ModalProps {
  className?: string;
  title: string;
  isClosable: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const variants = {
  dialogInitial: {
    y: 16,
    opacity: 0,
  },
  dialogVisible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  overlayInitial: {
    opacity: 0,
  },
  overlayVisible: {
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
} as Variants;

const Modal: React.FC<ModalProps> = ({
  className,
  isClosable,
  isOpen,
  onClose,
  children,
  title,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.aside
            className={`fixed max-h-[calc(100vh-4rem)] my-auto overflow-y-auto inset-0 z-50 w-5/6 p-8 m-auto mx-auto space-y-4 bg-white border-2 shadow-xl dark:bg-zinc-800 h-min md:w-1/2 rounded-xl border-zinc-800 ${className}`}
            variants={variants}
            initial="dialogInitial"
            animate="dialogVisible"
            exit="dialogInitial"
            role="dialog"
          >
            <div className="flex items-center justify-between w-full">
              <h2 className="text-2xl font-semibold ">{title}</h2>
              {isClosable && (
                <button
                  className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-white"
                  onClick={onClose}
                >
                  <UilTimes />
                </button>
              )}
            </div>
            {children}
          </motion.aside>
          <motion.div
            className="fixed inset-0 z-40 bg-white/50 dark:bg-zinc-800/50"
            variants={variants}
            initial="overlayInitial"
            animate="overlayVisible"
            exit="overlayInitial"
            onClick={() => {
              if (isClosable) {
                onClose();
              }
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
};

Modal.defaultProps = {
  className: "",
};

export default Modal;
