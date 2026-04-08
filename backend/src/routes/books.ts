import { List } from "@/interfaces/List"
import createNytClient from "@/services/api-client/nytClient"
import { createBookList, createBooks } from "@/services/nytDatabaseService"
import { Request, Router } from "express"
import { prisma } from "@lib/prisma"

const router = Router()

type Categories =
  | "combined-print-and-e-book-fiction"
  | "combined-print-and-e-book-nonfiction"
  | "hardcover-fiction"
  | "hardcover-nonfiction"
  | "trade-fiction-paperback"
  | "paperback-nonfiction"
  | "advice-how-to-and-miscellaneous"
  | "childrens-middle-grade-hardcover"
  | "picture-books"
  | "series-books"
  | "young-adult-hardcover"
  | "audio-fiction"
  | "audio-nonfiction"
  | "business-books"
  | "graphic-books-and-manga"
  | "mass-market-monthly"
  | "middle-grade-paperback-monthly"
  | "young-adult-paperback-monthly"

router.get("/", (_, res) => {
  res.status(200).json("Books route is working")
})

router.get("/:category", async (req: Request<{ category: Categories }>, res) => {
  const { category } = req.params
  const data = await prisma.nytBookList.findFirst({
    where: { list_name_encoded: category },
    include: { books: true }
  })

  //If data exists in the database, return it.
  if (data && data.books.length !== 0) {
    return res.status(200).json(data)
  } else {
    //else fetch from the API, store in the database, and return it.
    const client = createNytClient<List>(`current/${category}.json`)
    const data = await client.getAll()

    if (data.books.length === 0) {
      return res.status(404).json({ message: "No books found for this category" })
    }

    try {
      // Store the fetched data in the database
      await createBookList(data)
      await createBooks(data)

      // Fetch the data from the database
      const list = await prisma.nytBookList.findFirst({
        where: { list_name_encoded: category },
        include: { books: true }
      })

      //then return the data to the client
      res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({ message: "Error occurred while storing books in the database" })
    }
  }
})

export default router
