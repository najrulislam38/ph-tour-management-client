import config from "@/config";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,

  // headers: {
  // **  Authorization: "headers er authorizationer maddhome token pathano jay ", **/
  // },
  //   timeout: 1000,
  //   headers: { "X-Custom-Header": "foobar" },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // console.log("Axios", config);

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

let isRefreshing = false;

const pendingQueue: {
  resolve: (value, unknown) => void;
  reject: (value, unknown) => void;
}[] = [];
// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    isRefreshing = true;

    // console.log(originalRequest);
    if (
      error.response.status === 500 &&
      error.response.data.message === "jwt expired"
    ) {
      console.log("Your token is expired");

      try {
        const res = await axiosInstance.post("/auth/refresh-token");

        console.log("New Token arrived", res);

        return axiosInstance(originalRequest);
      } catch (error) {
        console.error(error);
      }
    }
  }
);
