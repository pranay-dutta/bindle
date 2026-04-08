import type { NytBook } from "./NytBook";

export interface List {
  display_name: string;
  list_name: string;
  list_name_encoded: string;
  normal_list_ends_at: number;
  updated: "MONTHLY" | "WEEKLY";
  list_id: number;
  uri: string;
  books: NytBook[];
}
