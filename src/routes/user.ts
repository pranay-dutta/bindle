import { Router } from "express"
import { prisma } from "../../lib/prisma"
import requireAuth from "../middlewares/requireAuth"

const router = Router()

// Endpoint to register user after authentication
router.post("/register", requireAuth, async (req, res) => {
  const clerkPayload = req.user //payload signed by clerk after successful authentication

  try {
    const newUser = await prisma.user.upsert({
      where: { id: clerkPayload.sub },
      create: {
        id: clerkPayload.sub,
        email: clerkPayload.user_email,
        fullName: clerkPayload.user_name,
      },
      update: {},
    })

    res.status(200).json({ message: "User created successfully", user: newUser })
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" })
  }
})

// Endpoint to get current user info
router.get("/me", requireAuth, async (req, res) => {
  res.status(200).json({ user: req.user })
})

export default router
