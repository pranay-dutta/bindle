import axios, { type AxiosRequestConfig } from "axios";
const { VITE_OPEN_LIB_URL } = import.meta.env;

const client = axios.create({
  baseURL: VITE_OPEN_LIB_URL,
});

class OpenLibClient<T> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get = async (params?: AxiosRequestConfig) => {
    return client.get<T>(this.endpoint, params).then((res) => res.data);
  };
}
export default <T>(endpoint: string) => new OpenLibClient<T>(endpoint);
