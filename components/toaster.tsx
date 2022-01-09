import {
  AnimatePresence,
  AnimateSharedLayout,
  Variants,
  motion,
} from "framer-motion";
import React, { useEffect, useState } from "react";
import { UilAngleDown, UilEllipsisH, UilTimes } from "@iconscout/react-unicons";

import Toast from "./toast";
import { useToastStore } from "../store";

const Toaster: React.FC = () => {
  const { messages, removeToast } = useToastStore((state) => ({
    messages: state.messages,
    removeToast: state.remove,
  }));

  function handleDelete(id: number) {
    console.log("deleting " + id);
    removeToast(id);
  }

  return (
    <>
      <AnimateSharedLayout>
        <motion.div layout className="fixed flex flex-col bottom-4 left-4">
          <AnimatePresence initial={false} exitBeforeEnter={false}>
            {messages.map((message, index) => (
              <Toast
                key={message.id}
                message={message}
                onDelete={() => handleDelete(message.id!)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </AnimateSharedLayout>
    </>
  );
};

export default Toaster;
