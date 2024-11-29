import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/"
      : "/api/",
});

const httpService = {
  get: async <T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return instance.get<T>(url, config);
  },
  post: async <T = unknown, D = unknown>(
    url: string,
    data: D,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return instance.post<T, AxiosResponse<T>, D>(url, data, config);
  },
  put: async <T = unknown, D = unknown>(
    url: string,
    data: D,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return instance.put<T, AxiosResponse<T>, D>(url, data, config);
  },
  delete: async <T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return instance.delete<T>(url, config);
  },
};

export default httpService;
