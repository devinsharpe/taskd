import { AnimatePresence, Variants, motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { UilCheck, UilTimes } from "@iconscout/react-unicons";

import Button from "./button";
import { SoundEffects } from "../pages/_app";
import useSoundEffect from "../hooks/useSoundEffect";

interface ConfirmationDialogProps {
  isLoading: boolean;
  isOpen: boolean;
  onClose: (choice: boolean) => void;
  subtitle: string;
  title: string;
  message: string;
}

const variants = {
  dialogInitial: {
    y: -32,
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

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isLoading,
  isOpen,
  onClose,
  message,
  subtitle,
  title,
}) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const { playSoundEffect } = useSoundEffect();

  useEffect(() => {
    if (cancelButtonRef.current) {
      cancelButtonRef.current.focus();
    }
  }, []);

  return (
    <>
      {isOpen && (
        <AnimatePresence>
          <motion.aside
            className={`fixed max-h-[calc(100vh-4rem)] overflow-y-auto inset-0 z-[70] w-11/12 my-8 border mx-auto space-y-4 bg-white shadow-xl dark:bg-zinc-800 h-min md:w-3/4 lg:w-3/5 max-w-2xl rounded-xl dark:border-zinc-600`}
            variants={variants}
            initial="dialogInitial"
            animate="dialogVisible"
            exit="dialogInitial"
            role="dialog"
            transition={variants.transition}
            key="confirmation-dialog"
          >
            <header className="flex-col modal-header">
              <h2 className="self-start text-2xl font-semibold ">{title}</h2>
              <h3 className="self-start text-lg font-semibold text-opacity-75">
                {subtitle}
              </h3>
            </header>
            <div className="modal-body">
              <p>{message}</p>
            </div>
            <footer className="modal-footer">
              <button
                autoFocus
                className="flex items-center justify-center w-full space-x-2 secondary"
                onClick={() => onClose(false)}
                type="button"
              >
                <UilTimes />
                <span>Cancel</span>
              </button>
              <Button
                scaleOnHover
                variant="primary"
                className="w-full"
                type="submit"
                isLoading={isLoading}
                onClick={() => {
                  onClose(true);
                  playSoundEffect(SoundEffects.interfaceError);
                }}
              >
                <div className="flex items-center w-full space-x-2">
                  <UilCheck />
                  <span>Confirm</span>
                </div>
              </Button>
            </footer>
          </motion.aside>
        </AnimatePresence>
      )}
      {isOpen && (
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 z-[60] bg-white/50 dark:bg-zinc-800/50"
            variants={variants}
            initial="overlayInitial"
            animate="overlayVisible"
            exit="overlayInitial"
            transition={variants.transition}
            key="confirmation-dialog-overlay"
          />
        </AnimatePresence>
      )}
    </>
  );
};

export default ConfirmationDialog;
