import { Router } from "express"
import { prisma } from "../../lib/prisma"
import { validateUser } from "../utils/auth"

const router = Router()

// Endpoint to register user after authentication
router.post("/register", async (req, res) => {
  const user = await validateUser(req)
  if (!user) return res.status(401).json({ message: "Unauthorized" })

  try {
    const newUser = await prisma.user.upsert({
      where: { id: user.id },
      create: {
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress || "",
        fullName: user.fullName || ""
      },
      update: {}
    })

    res.status(200).json({ message: "User created successfully", user: newUser })
  } catch (error) {
    return res.status(500).json({ error })
  }
})

// Endpoint to get current user info
router.get("/me", async (req, res) => {
  const user = await validateUser(req)
  if (!user) return res.status(401).json({ message: "Unauthorized" })

  res.status(200).json({ user })
})

export default router
