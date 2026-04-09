import "dotenv/config"
import axios from "axios"
import { env } from "node:process"
import { FetchResponse } from "../../interfaces/FetchResponse"

const client = axios.create({
  baseURL: env.NYT_URL,
  params: {
    "api-key": env.NYT_API
  }
})

class NYTClient<T> {
  private endpoint: string

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  get = async () => {
    return client.get<T>(this.endpoint).then((res) => res.data)
  }
  getAll = async () => {
    return client.get<FetchResponse<T>>(this.endpoint).then((res) => res.data.results)
  }
}
const createNytClient = <T>(endpoint: string) => {
  return new NYTClient<T>(endpoint)
}
export default createNytClient
