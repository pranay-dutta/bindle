import "dotenv/config";
import { Router } from "express";

const router = Router();

router.get("/:subject", async (req, res) => {
  const { subject } = req.params;
  const { offset, limit, sort, language } = req.query;

  try {
    const response = await fetch(
      `${
        process.env.OPEN_LIB_URL
      }/subjects/${subject.toLocaleLowerCase()}.json?offset=${offset}&limit=${limit}&sort=${sort}&language=${language}`
    );
    if (!response.ok) {
      console.log(response);
      return res.status(400).json({ error: "Failed to fetch subject data" });
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
