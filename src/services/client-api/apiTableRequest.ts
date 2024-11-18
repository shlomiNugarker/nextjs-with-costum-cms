/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig } from "axios";
import httpService from "../httpService";

export async function apiTableRequest(
  method: "get" | "post" | "put" | "delete",
  endpoint: string,
  data?: any,
  config?: AxiosRequestConfig
) {
  try {
    let response;

    if (method === "get" || method === "delete") {
      response = await httpService[method](endpoint, config);
    } else {
      response = await httpService[method](endpoint, data, config);
    }

    return response.data;
  } catch (error) {
    console.error(`Failed to ${method} data at ${endpoint}`, error);
    throw new Error(`Failed to ${method} data`);
  }
}
