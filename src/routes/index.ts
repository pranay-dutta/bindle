import bookRoutes from "./books";
import subjectRoutes from "./subjects";
import userRoutes from "./user";
import orderRoutes from "./order";
import { Router } from "express";

const router = Router();

router.use("/books", bookRoutes);
router.use("/subjects", subjectRoutes);
router.use("/user", userRoutes);
router.use("/order", orderRoutes);

export default router;
