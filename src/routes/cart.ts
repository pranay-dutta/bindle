import requireAuth from "@/middlewares/requireAuth"
import { Router } from "express"
import { prisma } from "../../lib/prisma"

const router = Router()

router.post("/create", requireAuth, async (req, res) => {
  const userId = req.user.sub //user id always exists because requireAuth middleware is used

  const cart = await prisma.cart.upsert({
    where: { userId },
    create: { userId },
    update: {}
  })

  res.status(201).json({ message: "Cart created successfully", cart })
})

router.get("/", requireAuth, async (req, res) => {
  const userId = req.user.sub

  // Fetch cart items for the user from the database
  const cartItems = await prisma.cart.findFirst({
    where: { userId },
    include: {
      items: true
    }
  })

  res.status(200).json({ message: "Cart items fetched successfully", cartItems })
})

router.post("/empty", requireAuth, async (req, res) => {
  const userId = req.user.sub

  // Delete all cart items for the user's cart
  const cartItemsResponse = await prisma.cartItem.deleteMany({
    where: { cart: { userId } }
  })

  res.status(200).json({ message: "Cart emptied successfully", cartItemsResponse })
})

export default router
