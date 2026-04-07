/**
 * Only use `Overview` or `List` as the type argument for `T`.
 *
 * Example:
 *   `FetchResponse<Overview>`
 *   `FetchResponse<List>`
 */
export interface FetchResponse<T> {
  status: string;
  copyright: string;
  num_results: number;
  last_modified?: string;
  results: T;
}
