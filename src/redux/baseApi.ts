import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  // baseQuery: fetchBaseQuery({
  //   baseUrl: "localhost:500/api/v1",
  //   credentials: "include",
  // }),
  tagTypes: ["USER", "TOUR", "DIVISION"],
  endpoints: () => ({}),
});
