import type { Results } from "./Results";

export interface FetchResponse {
  status: string;
  copyright: string;
  num_results: number;
  results: Results;
}
