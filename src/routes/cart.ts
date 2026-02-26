import requireAuth from "@/middlewares/requireAuth"
import { Router } from "express"
import { prisma } from "../../lib/prisma"

const router = Router()

router.get("/create", requireAuth, async (req, res) => {
  const userId = req.user.sub

  // Upsert the cart for the user, creating it if it doesn't exist and including the cart items in the response
  const cartItems = await prisma.cart.upsert({
    where: { userId },
    create: { userId },
    update: {},
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
