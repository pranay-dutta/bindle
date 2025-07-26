export interface OLBook {
  works: Work[];
  title: string;
  publishers: string[];
  publish_date: string;
  key: string;
  type: Work;
  identifiers: Identifiers;
  languages: Work[];
  covers: number[];
  physical_dimensions: string;
  publish_places: string[];
  subtitle: string;
  description?: Created;
  physical_format: string;
  number_of_pages: number;
  copyright_date: string;
  isbn_10: string[];
  isbn_13: string[];
  oclc_numbers: string[];
  dewey_decimal_class: string[];
  lc_classifications: string[];
  source_records: string[];
  latest_revision: number;
  revision: number;
  created: Created;
  last_modified: Created;
}

export interface Created {
  type: string;
  value: string;
}

export interface Identifiers {
  learnawesome: string[];
  amazon: string[];
  wikidata: string[];
  goodreads: string[];
}

export interface Work {
  key: string;
}
