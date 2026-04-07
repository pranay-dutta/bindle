export const Name = {
  Amazon: "Amazon",
  AppleBooks: "Apple Books",
  BarnesAndNoble: "Barnes and Noble",
  BarnesNoble: "Barnes & Noble",
  BooksAMillion: "Books-A-Million",
  BookshopOrg: "Bookshop.org"
} as const

export type Name = (typeof Name)[keyof typeof Name]