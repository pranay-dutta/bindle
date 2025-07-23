import type { Isbn } from "./Isbn";
import type { BuyLink } from "./BuyLink";
import type { AgeGroup } from "./AgeGroup";

export interface Book {
  age_group: AgeGroup;
  amazon_product_url: string;
  article_chapter_link: string;
  asterisk: number;
  author: string;
  book_image: string;
  book_image_height: number;
  book_image_width: number;
  book_review_link: string;
  book_uri: string;
  contributor: string;
  contributor_note: string;
  created_date: Date;
  dagger: number;
  description: string;
  first_chapter_link: string;
  price: string;
  primary_isbn10: string;
  primary_isbn13: string;
  publisher: string;
  rank: number;
  rank_last_week: number;
  sunday_review_link: string;
  title: string;
  updated_date: Date;
  weeks_on_list: number;
  isbns: Isbn[];
  buy_links: BuyLink[];
}
