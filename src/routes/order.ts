import { Router } from "express"
import { prisma } from "../../lib/prisma"
import { validateUser } from "../utils/auth"

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
  const orders = req.body
  if (!orders || orders.length === 0) {
    return res.status(400).json({ error: "No items to order" })
  }

  const user = await validateUser(req)
  if (!user) return res.status(401).json({ error: "Unauthorized" })

  //Calculate the total price of the order
  const totalPrice = orders.reduce(
    (total: number, item: any) => total + item.price * item.quantity,
    0
  )

  // Create the order and associated order items in the database
  const orderResponse = await prisma.order.create({
    data: {
      totalPrice,
      userId: user.id,
      orderItems: {
        create: orders
      }
    },
    include: {
      orderItems: true
    }
  })

  if (!orderResponse || orderResponse.orderItems.length === 0) {
    return res.status(500).json({ error: "Failed to place order" })
  }
  res.status(201).json({ message: "Order Placed", orderResponse })
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
