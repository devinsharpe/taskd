import { SetState, State } from "zustand";

import type { User } from "@supabase/supabase-js";

export interface UserState extends State {
  user: User | null;
  setUser: (userObj: User) => void;
}

const UserStore = (set: SetState<UserState>) => ({
  user: null,
  setUser: (userObj: User) => {
    set((state) => ({ ...state, user: userObj }));
  },
});

export default UserStore;
