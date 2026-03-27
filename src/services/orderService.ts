import { prisma } from "../../lib/prisma"

const createOrderForUser = async (userId: string) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: true }
  })

  if (!cart || cart.items.length === 0) throw new Error("Cart is empty")

  const orders = cart.items.map((item) => ({
    bookTitle: item.bookTitle,
    image: item.image,
    price: item.price,
    quantity: item.quantity
  }))

  const totalPrice = orders.reduce((total, item) => total + item.price * item.quantity, 0)

  return prisma.order.create({
    data: {
      totalPrice,
      userId,
      orderItems: { create: orders }
    },
    include: { orderItems: true }
  })
}

const getUserOrders = async (userId: string) => {
  const orders = await prisma.order.findMany({
    where: { userId: userId },
    include: {
      orderItems: true
    },
    orderBy: { createdAt: "desc" }
  })
  return orders
}

export { createOrderForUser, getUserOrders }
