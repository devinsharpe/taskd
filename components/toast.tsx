import { UilAngleDown, UilAngleUp, UilTimes } from "@iconscout/react-unicons";
import { motion, Variants } from "framer-motion";
import React, { useState } from "react";
import { Toast } from "../store/toast";

export interface ToastProps {
  message: Toast;
  onDelete: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);

  const variants = {
    hidden: { y: 100 },
    visible: { y: 0 },
    exit: { opacity: 0 },
  } as Variants;

  return (
    <motion.article
      className="my-1 overflow-hidden bg-white rounded-lg shadow-md dark:bg-zinc-800 w-96 group"
      variants={variants}
      initial="hidden"
      animate="visible"
      layout
      transition={{
        type: "spring",
        duration: 0.5,
      }}
    >
      <motion.div className="flex items-center justify-between w-full p-4 space-x-2">
        <div className="flex items-center justify-between w-full space-x-2">
          <h3
            className={`mb-0 font-bold ${
              message.status === "SUCCESS"
                ? "text-lime-700 dark:text-lime-400"
                : ""
            }
            ${
              message.status === "INFO"
                ? "text-yellow-700 dark:text-yellow-400"
                : ""
            }
            ${
              message.status === "WARNING"
                ? "text-amber-700 dark:text-amber-400"
                : ""
            }
            ${
              message.status === "ERROR"
                ? "text-rose-700 dark:text-rose-400"
                : ""
            }`}
          >
            {message.title}
          </h3>
          <button
            type="button"
            className="text-gray-300 duration-150 opacity-0 group-hover:opacity-100 transitition-opacity"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? <UilAngleUp /> : <UilAngleDown />}
          </button>
        </div>
        {message.isClosable && (
          <button
            className="w-auto p-1 m-0 pointer-events-auto text-zinc-800 dark:text-zinc-100"
            onClick={onDelete}
          >
            <UilTimes />
          </button>
        )}
      </motion.div>
      {showDetails && <p className="p-4 pt-0">{message.description}</p>}
    </motion.article>
  );
};

export default Toast;
