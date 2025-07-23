import type { FetchResponse } from "@/interfaces/new-york-times/FetchResponse";
import axios from "axios";
const { VITE_NYT_API, VITE_NYT_URL } = import.meta.env;

const client = axios.create({
  baseURL: VITE_NYT_URL,
  params: {
    "api-key": VITE_NYT_API,
  },
});

class NYTClient<T> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get = async () => {
    return client.get<T>(this.endpoint).then((res) => res.data);
  };
  getAll = async () => {
    return client.get<FetchResponse<T>>(this.endpoint).then((res) => res.data);
  };
}
export default <T>(endpoint: string) => new NYTClient<T>(endpoint);
