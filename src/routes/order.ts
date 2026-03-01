import { Router } from "express"
import { prisma } from "../../lib/prisma"
import { validateUser } from "../utils/auth"
import { createOrderForUser } from "../services/orderService"
import { clearCartForUser } from "../services/cartService"

const router = Router()

router.get("/getall", async (req, res) => {
  const user = await validateUser(req)
  if (!user) return res.status(401).json({ error: "Unauthorized" })

  // Fetch orders for the authenticated user
  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: {
      orderItems: true
    }
  })
  res.status(200).json({ orders })
})

router.post("/create", async (req, res) => {
  const user = await validateUser(req)
  if (!user) return res.status(401).json({ error: "Unauthorized" })

  try {
    await createOrderForUser(user.id)
    await clearCartForUser(user.id)
    return res.status(201).json({ message: "Order Placed" })

  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.post("/cancel/:orderId", async (req, res) => {
  const orderId = req.params.orderId
  if (!orderId) return res.status(400).json({ error: "Invalid order ID" })

  const user = await validateUser(req)
  if (!user) return res.status(401).json({ error: "Unauthorized" })

  // Cancel the order in the database
  const orderResponse = await prisma.order.delete({
    where: {
      id: orderId,
      userId: user.id
    }
  })

  res.status(200).json({ message: "Order cancelled successfully", orderResponse })
})
export default router
