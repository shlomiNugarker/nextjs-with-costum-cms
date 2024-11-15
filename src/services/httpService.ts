/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/api",
});

const httpService = {
  get: async (
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> => {
    return instance.get(url, config);
  },
  post: async (
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> => {
    return instance.post(url, data, config);
  },
  put: async (
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> => {
    return instance.put(url, data, config);
  },
  delete: async (
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> => {
    return instance.delete(url, config);
  },
};

export default httpService;
