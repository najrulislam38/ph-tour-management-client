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

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER";

// interface IRole {
//   SUPER_ADMIN: string;
//   ADMIN: string;
//   USER: string;
// }

// export const Role: IRole = {
//   SUPER_ADMIN: "SUPER_ADMIN",
//   ADMIN: "ADMIN",
//   USER: "USER",
// };
