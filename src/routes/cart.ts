import { Router } from "express"
import { prisma } from "../../lib/prisma"
import { validateUser } from "../utils/auth"

const router = Router()

router.post("/create", async (req, res) => {
  const user = await validateUser(req)
  if (!user) return res.status(401).json({ message: "Unauthorized" })

  // Upsert the cart for the user, creating it if it doesn't exist and including the cart items in the response
  const cart = await prisma.cart.upsert({
    where: { userId: user.id },
    create: { userId: user.id },
    update: {},
    include: {
      items: true
    }
  })

  res.status(200).json({ message: "Cart created successfully", cart })
})

router.get("/getall", async (req, res) => {
  const user = await validateUser(req)
  if (!user) return res.status(401).json({ message: "Unauthorized" })

  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: {
      items: true
    }
  })
  res.status(200).json({ message: "Cart items fetched successfully", cart })
})

router.post("/clear", async (req, res) => {
  const user = await validateUser(req)
  if (!user) return res.status(401).json({ message: "Unauthorized" })

  // Delete all cart items for the user's cart
  const items = await prisma.cartItem.deleteMany({
    where: { cart: { userId: user.id } }
  })

  res.status(200).json({ message: "Cart cleared successfully", items })
})
export default router
