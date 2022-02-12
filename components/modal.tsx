import { AnimatePresence, Variants, motion } from "framer-motion";
import React, { ReactElement } from "react";

import { UilTimes } from "@iconscout/react-unicons";

interface ModalProps {
  className?: string;
  footer?: React.ReactNode;
  title: string;
  isClosable: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const variants = {
  dialogInitial: {
    y: 32,
    opacity: 0,
  },
  dialogVisible: {
    y: 0,
    opacity: 1,
  },
  transition: {
    duration: 0.5,
    ease: "easeInOut",
  },
  overlayInitial: {
    opacity: 0,
  },
  overlayVisible: {
    opacity: 1,
    transition: {
      duration: 0.5,
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
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            className={`fixed max-h-[calc(100vh-4rem)] my-auto overflow-y-auto inset-0 z-50 w-5/6 m-auto border mx-auto space-y-4 bg-white shadow-xl dark:bg-zinc-800 h-min md:w-3/4 lg:w-3/5 max-w-2xl rounded-xl dark:border-zinc-600  ${className}`}
            variants={variants}
            initial="dialogInitial"
            animate="dialogVisible"
            exit="dialogInitial"
            role="dialog"
            transition={variants.transition}
          >
            <header className="modal-header">
              <h2 className="text-2xl font-semibold ">{title}</h2>
              {isClosable && (
                <button
                  className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-white"
                  onClick={onClose}
                >
                  <UilTimes />
                </button>
              )}
            </header>
            <div>{children}</div>
          </motion.aside>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white/50 dark:bg-zinc-800/50"
            variants={variants}
            initial="overlayInitial"
            animate="overlayVisible"
            exit="overlayInitial"
            transition={variants.transition}
            onClick={() => {
              if (isClosable) {
                onClose();
              }
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

Modal.defaultProps = {
  className: "",
};

export default Modal;
