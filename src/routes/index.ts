import bookRoutes from "./books";
import subjectRoutes from "./subjects";
import { Router } from "express";

const router = Router();

router.use("/books", bookRoutes);
router.use("/subjects", subjectRoutes);

export default router;
