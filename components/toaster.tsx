import {
  AnimatePresence,
  AnimateSharedLayout,
  Variants,
  motion,
} from "framer-motion";
import React from "react";

import Toast from "./toast";
import { useToastStore } from "../store";

const Toaster: React.FC = () => {
  const { messages, removeToast } = useToastStore((state) => ({
    messages: state.messages,
    removeToast: state.remove,
  }));

  function handleDelete(id: number) {
    removeToast(id);
  }

  return (
    <>
      <AnimateSharedLayout>
        <motion.div layout className="fixed z-50 flex flex-col bottom-4 left-4">
          <AnimatePresence initial={false} exitBeforeEnter={false}>
            {messages.map((message) => (
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
