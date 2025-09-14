export interface SearchData {
  start: number;
  num_found: number;
  docs: SearchedBook[];
}

export interface SearchedBook {
  author_name: string[];
  first_publish_year: number;
  language: string[];
  cover_i?: number;
  key: string;
  title: string;
}
