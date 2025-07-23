import type { Book } from "./Book";
import type { Updated } from "./Updated";

export interface List {
  display_name: string;
  list_name: string;
  list_name_encoded: string;
  normal_list_ends_at: number;
  updated: Updated;
  list_id: number;
  uri: string;
  books: Book[];
}
