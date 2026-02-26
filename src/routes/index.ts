import bookRoutes from "./books";
import subjectRoutes from "./subjects";
import userRoutes from "./user";
import orderRoutes from "./order";
import cartRoutes from "./cart";
import cartItemRoutes from "./cartItem";

import { Router } from "express";

const router = Router();

router.use("/books", bookRoutes);
router.use("/subjects", subjectRoutes);
router.use("/user", userRoutes);
router.use("/order", orderRoutes);
router.use("/cart", cartRoutes);
router.use("/cart-item", cartItemRoutes);

export default router;
