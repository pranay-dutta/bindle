import type { List } from "./List";

export interface Results {
  previous_published_date: Date;
  published_date: Date;
  next_published_date: string;
  published_date_description: string;
  bestsellers_date: Date;
  lists: List[];
  monthly_uri: string;
  weekly_uri: string;
}
