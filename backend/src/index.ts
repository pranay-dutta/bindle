import data from "@/cache/hardcover-nonfiction.json";
import { prisma } from "../lib/prisma";
import { clear } from "node:console";

// Book List table
const createBookList = async () => {
  const bookList = await prisma.bookList.create({
    data: {
      id: data.results.list_id,
      listName: data.results.list_name,
      listNameEncoded: data.results.list_name_encoded,
    },
  });
};
const getBooks = async () => {
  const books = await prisma.bookList.findMany({
    where: { id: 13 },
    include: { books: true },
  });
  // console.dir(books, { depth: null });
};

const deleteBookList = async () => {
  await prisma.bookList.deleteMany({
    where: { id: 24 },
  });
};

// Book table
const createBooks = async () => {
  const books = data.results.books;
  books.forEach(async (b) => {
    const bookResponse = await prisma.book.create({
      data: {
        listId: data.results.list_id,
        author: b.author,
        amazonProductUrl: b.amazon_product_url,
        bookImage: b.book_image,
        description: b.description,
        primaryIsbn13: b.primary_isbn13,
        primaryIsbn10: b.primary_isbn10,
        title: b.title,
        price: Math.floor(Math.random() * 50) + 50,
      },
    });
  });
};
const deleteBooks = async () => {
  await prisma.book.deleteMany({
    where: { listId: 24 },
  });
};

//Sale table
const putOnSale = async () => {
  const books = data.results.books;
  books.forEach(async (b) => {
    const saleResponse = await prisma.sale.create({
      data: {
        title: b.title,
        author: b.author,
        bookImage: b.book_image,
        salePercent: parseFloat((Math.random() * 0.7).toFixed(2)),
        price: Math.floor(Math.random() * 50) + 50,
        isbn10: b.primary_isbn10,
        isbn13: b.primary_isbn13,
      },
    });
  });
};

const clearSales = async () => {
  await prisma.sale.deleteMany({});
};

putOnSale();
// clearSales();

console.log((Math.random() * 0.7).toFixed(2));

// deleteBooks();
// deleteBookList();
// createBookList();
// createBooks();
// data.results.books.forEach((b, index) => console.log(index + 1, b.title));
