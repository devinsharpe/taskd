import { Session, User } from "@supabase/supabase-js";
import { SetState, State } from "zustand";

export interface APIState extends State {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number;
  setSession: (session: Session) => void;
}

const APIStore = (set: SetState<APIState>) => ({
  user: null,
  accessToken: "",
  refreshToken: "",
  expiresAt: -1,
  setSession: (session: Session) => {
    set(() => ({
      user: session.user,
      accessToken: session.access_token,
      refreshToken: session.refresh_token!,
      expiresAt: session.expires_at!,
    }));
  },
});

export default APIStore;
