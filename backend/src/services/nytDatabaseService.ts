import { List } from "../interfaces/List"
import { prisma } from "../../lib/prisma"

/**
 * @param data - List data to be created or updated in database
 * @desc Create a new book list or update it in database
 */
const createBookList = async (data: List) => {
  await prisma.nytBookList.upsert({
    where: { id: data.list_id },
    create: {
      id: data.list_id,
      list_name: data.list_name,
      list_name_encoded: data.list_name_encoded
    },
    update: {
      list_name: data.list_name,
      list_name_encoded: data.list_name_encoded
    }
  })
}

/**
 * @param data - List data containing books to be created or updated
 * @desc Create or update books in the database
 */
const createBooks = async (data: List) => {
  const books = data.books
  const list_id = data.list_id

  await Promise.all(
    books.map(async (book) => {
      const currentBook = {
        list_id,
        author: book.author,
        amazon_product_url: book.amazon_product_url,
        book_image: book.book_image,
        description: book.description,
        price: Math.floor(Math.random() * 50) + 50,
        primary_isbn13: book.primary_isbn13,
        primary_isbn10: book.primary_isbn10,
        title: book.title
      }

      await prisma.nytBook.upsert({
        where: { title: book.title },
        update: { ...currentBook },
        create: { ...currentBook }
      })
    })
  )
}

export { createBookList, createBooks }
