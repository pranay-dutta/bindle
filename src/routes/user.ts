import { Router } from "express";
import { prisma } from "../../lib/prisma";
import requireAuth from "../middlewares/requireAuth";

const router = Router();

// Endpoint to register user after authentication
router.post("/register", requireAuth, async (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  try {
    const newUser = await prisma.user.upsert({
      where: { id: user.sub },
      create: {
        id: user.sub,
        email: user.primaryEmailAddress?.emailAddress || "",
        fullName: user.fullName,
      },
      update: {},
    });

    res
      .status(200)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to get current user info
router.get("/me", requireAuth, async (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  res.status(200).json({ user });
});

export default router;
