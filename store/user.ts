import { SetState, State } from "zustand";

import { Account } from "../types/models";
import type { User } from "@supabase/supabase-js";

export interface UserState extends State {
  account: Account | null;
  user: User | null;
  setAccount: (accountObj: Account | null) => void;
  setUser: (userObj: User | null) => void;
}

const UserStore = (set: SetState<UserState>) => ({
  account: null,
  user: null,
  setAccount: (accountObj: Account | null) => {
    set((state) => ({ ...state, account: accountObj }));
    if (accountObj && typeof window !== "undefined") {
      window.sessionStorage.setItem("taskd-toggl-token", accountObj.togglToken);
    }
  },
  setUser: (userObj: User | null) => {
    set((state) => ({ ...state, user: userObj }));
  },
});

export default UserStore;
