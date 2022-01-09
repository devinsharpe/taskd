import { GetState, SetState, State } from "zustand";

export interface Toast {
  id?: number;
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
  remove: (index: number) => Toast | undefined;
}

const ToastStore = (set: SetState<ToastState>, get: GetState<ToastState>) => ({
  messages: [] as Toast[],
  reset: () => {
    set(() => ({ messages: [] }));
  },
  push: (message: Toast) => {
    set((state) => ({
      messages: [
        ...state.messages,
        { ...message, id: Math.round(Math.random() * 1000) },
      ],
    }));
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
  remove: (id: number) => {
    const toast = get().messages.find((message) => message.id === id);
    if (toast) {
      set((state) => ({
        messages: state.messages.filter((message) => message.id !== id),
      }));
    }
    return toast;
  },
});

export default ToastStore;
