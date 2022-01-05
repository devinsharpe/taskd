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

  return (
    <>
      <AnimateSharedLayout>
        <motion.div layout className="fixed flex flex-col bottom-4 left-4">
          <AnimatePresence initial={false} exitBeforeEnter={false}>
            {messages.map((message, index) => (
              <Toast
                key={index}
                message={message}
                onDelete={() => removeToast(index)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </AnimateSharedLayout>
    </>
  );
};

export default Toaster;
