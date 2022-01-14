import APIStore, { APIState } from "./api";
import {
  StoreApiWithSubscribeWithSelector,
  devtools,
} from "zustand/middleware";
import ThemeStore, { ThemeState } from "./theme";
import ToastStore, { ToastState } from "./toast";
import UserStore, { UserState } from "./user";
import create, { GetState, SetState } from "zustand";

export const useAPIStore = create<
  APIState,
  SetState<APIState>,
  GetState<APIState>,
  StoreApiWithSubscribeWithSelector<APIState>
>(devtools(APIStore, { name: "API" }));
export const useThemeStore = create<
  ThemeState,
  SetState<ThemeState>,
  GetState<ThemeState>,
  StoreApiWithSubscribeWithSelector<ThemeState>
>(devtools(ThemeStore, { name: "Theme" }));
export const useToastStore = create<
  ToastState,
  SetState<ToastState>,
  GetState<ToastState>,
  StoreApiWithSubscribeWithSelector<ToastState>
>(devtools(ToastStore, { name: "Toaster" }));
export const useUserStore = create<
  UserState,
  SetState<UserState>,
  GetState<UserState>,
  StoreApiWithSubscribeWithSelector<UserState>
>(devtools(UserStore, { name: "User" }));
