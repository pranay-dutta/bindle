import type { FetchResponse } from "@/interfaces/new-york-times/FetchResponse";
import axios, { type AxiosRequestConfig } from "axios";
const { VITE_BACKEND_URL } = import.meta.env;
class BackendClient<T> {
  private endpoint: string;
  private token: string | null;

  constructor(endpoint: string, token: string | null) {
    this.endpoint = endpoint;
    this.token = token;
  }

  private getAuthClient = () => {
    //create an axios instance with the token in the headers if it exists
    return axios.create({
      baseURL: VITE_BACKEND_URL,
      headers: {
        Authorization: `Bearer ${this.token || ""}`
      }
    });
  };

  get = async (params?: AxiosRequestConfig) => {
    return this.getAuthClient()
      .get<T>(this.endpoint, params)
      .then((res) => res.data);
  };
  post = async (data?: T, config?: AxiosRequestConfig) => {
    return this.getAuthClient()
      .post(this.endpoint, data, config)
      .then((res) => res.data);
  };
  patch = async (data?: T, config?: AxiosRequestConfig) => {
    return this.getAuthClient()
      .patch(this.endpoint, data, config)
      .then((res) => res.data);
  };
  delete = async (config?: AxiosRequestConfig) => {
    return this.getAuthClient()
      .delete(this.endpoint, config)
      .then((res) => res.data);
  };
  getNytAll = async () => {
    return this.getAuthClient()
      .get<FetchResponse<T>>(this.endpoint)
      .then((res) => res.data.results);
  };
}
const createBackendClient = <T>(endpoint: string, token: string | null) => {
  return new BackendClient<T>(endpoint, token);
};
export default createBackendClient;
