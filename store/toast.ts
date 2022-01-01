import { GetState, SetState, State } from "zustand";

export interface Toast {
  title: string;
  description?: string;
  duration: number;
  isClosable: boolean;
  status: "SUCCESS" | "INFO" | "WARNING" | "ERROR";
}

export interface ToastState extends State {
  messages: Toast[];
  reset: () => void;
  push: (message: Toast) => void;
  shift: () => Toast | undefined;
}

const ToastStore = (set: SetState<ToastState>, get: GetState<ToastState>) => ({
  messages: [] as Toast[],
  reset: () => {
    set(() => ({ messages: [] }));
  },
  push: (message: Toast) => {
    set((state) => ({ messages: [...state.messages, message] }));
  },
  shift: () => {
    if (get().messages.length) {
      const message = get().messages[0];
      set((state) => ({ messages: [...state.messages.slice(1)] }));
      return message;
    } else {
      return undefined;
    }
  },
});

export default ToastStore;
