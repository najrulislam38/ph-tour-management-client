import type { ComponentType } from "react";

export type { ISendOtp, ILogin, IVerifyOtp } from "./auth.types";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export type IRole = "SUPER_ADMIN" | "ADMIN" | "USER";
