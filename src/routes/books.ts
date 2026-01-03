import { Request, Router } from "express";
import adviceHowToBooks from "../cache/advice_how_to_and_miscellaneous.json";
import childrenMiddleGradeHardCoverBooks from "../cache/childrens-middle-grade-hard-cover.json";
import hardCoverNonFictionBooks from "../cache/hardcover-nonfiction.json";
import seriesBooks from "../cache/series-books.json";
import youngAdultHardcoverBooks from "../cache/young-adult-hardcover.json";

const router = Router();

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
  | "young-adult-paperback-monthly";

const bookMap = new Map<Categories, any>([
  ["advice-how-to-and-miscellaneous", adviceHowToBooks],
  ["childrens-middle-grade-hardcover", childrenMiddleGradeHardCoverBooks],
  ["series-books", seriesBooks],
  ["young-adult-hardcover", youngAdultHardcoverBooks],
  ["hardcover-nonfiction", hardCoverNonFictionBooks],
]);

router.get("/", (_, res) => {
  res.status(200).json("Books route is working");
});

router.get("/:category", (req: Request<{ category: Categories }>, res) => {
  const { category } = req.params;

  if (!bookMap.has(category)) {
    return res.status(400).json({ error: "Invalid category" });
  }

  const data = bookMap.get(category) || [];
  res.status(200).json(data);
});

export default router;
