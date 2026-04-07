export interface OLWork {
  type: Type;
  title: string;
  authors: Author[];
  key: string;
  description?: string | Description;
  latest_revision: number;
  revision: number;
  created: Created;
  last_modified: Created;
}

export interface Description {
  type: string;
  value: string;
}

export interface Author {
  author: Type;
  type: Type;
}

export interface Type {
  key: string;
}

export interface Created {
  type: string;
  value: Date;
}
