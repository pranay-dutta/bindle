import type { FetchResponse } from "@/interfaces/new-york-times/FetchResponse";
import axios, { type AxiosRequestConfig } from "axios";
const { VITE_BACKEND_URL } = import.meta.env;

const client = axios.create({
  baseURL: VITE_BACKEND_URL
});

class BackendClient<T> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get = async (params?: AxiosRequestConfig) => {
    return client.get<T>(this.endpoint, params).then((res) => res.data);
  };
  post = async (data: T, config?: AxiosRequestConfig) => {
    return client.post(this.endpoint, data, config).then((res) => res.data);
  };
  patch = async (data: T, config?: AxiosRequestConfig) => {
    return client.patch(this.endpoint, data, config).then((res) => res.data);
  };
  delete = async (config?: AxiosRequestConfig) => {
    return client.delete(this.endpoint, config).then((res) => res.data);
  };
  getNytAll = async () => {
    return client
      .get<FetchResponse<T>>(this.endpoint)
      .then((res) => res.data.results);
  };
}
const createBackendClient = <T>(endpoint: string) => {
  return new BackendClient<T>(endpoint);
};
export default createBackendClient;
