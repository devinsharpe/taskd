import APIStore, { APIState } from "./api";
import ToastStore, { ToastState } from "./toast";
import UserStore, { UserState } from "./user";
import create, { GetState, SetState } from "zustand";

import { StoreApiWithSubscribeWithSelector } from "zustand/middleware";

export const useAPIStore = create<
  APIState,
  SetState<APIState>,
  GetState<APIState>,
  StoreApiWithSubscribeWithSelector<APIState>
>(APIStore);
export const useToastStore = create<
  ToastState,
  SetState<ToastState>,
  GetState<ToastState>,
  StoreApiWithSubscribeWithSelector<ToastState>
>(ToastStore);
export const useUserStore = create<
  UserState,
  SetState<UserState>,
  GetState<UserState>,
  StoreApiWithSubscribeWithSelector<UserState>
>(UserStore);
