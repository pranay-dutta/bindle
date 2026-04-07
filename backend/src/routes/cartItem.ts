import { Router } from "express"
import { prisma } from "../../lib/prisma"
import { validateUser } from "../utils/auth"

const router = Router()

//Create a single cart item
router.post("/add", async (req, res) => {
  const user = await validateUser(req)
  if (!user) return res.status(401).json({ error: "Unauthorized" })

  //Create of fetch cart of current user
  const cart = await prisma.cart.upsert({
    where: { userId: user.id },
    create: { userId: user.id },
    update: {}
  })

  const existingItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, bookTitle: req.body.bookTitle }
  })

  if (existingItem) {
    const response = await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + req.body.quantity }
    })

    return res.status(200).json({ message: "Cart item updated successfully", response })
  } else {
    const response = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        bookTitle: req.body.bookTitle,
        image: req.body.image,
        price: req.body.price,
        quantity: req.body.quantity
      }
    })
    return res.status(200).json({ message: "Cart item created successfully", response })
  }
})

//Delete a single cart item
router.delete("/:itemId", async (req, res) => {
  const { itemId } = req.params

  await prisma.cartItem.delete({
    where: { id: itemId }
  })

  res.status(200).json({ message: "Item removed" })
})

//Increase quantity of a single cart item
router.patch("/increase/:bookId", async (req, res) => {
  const { bookId } = req.params
  const user = await validateUser(req)
  if (!user) return res.status(401).json({ error: "Unauthorized" })

  const cart = await prisma.cart.findUnique({ where: { userId: user.id } })

  if (!cart) {
    return res.status(404).json({ error: "Cart not found" })
  }

  const existingItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, id: bookId }
  })

  if (!existingItem) {
    return res.status(404).json({ error: "Cart item not found" })
  }

  const updatedItem = await prisma.cartItem.update({
    where: { id: existingItem.id },
    data: { quantity: { increment: 1 } }
  })

  res.status(200).json({ message: "Cart item quantity increased", updatedItem })
})

//Decrease quantity of a single cart item
router.patch("/decrease/:bookId", async (req, res) => {
  const { bookId } = req.params

  const user = await validateUser(req)
  if (!user) return res.status(401).json({ error: "Unauthorized" })

  const cart = await prisma.cart.findUnique({ where: { userId: user.id } })
  if (!cart) return res.status(404).json({ error: "Cart not found" })

  const existingItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, id: bookId }
  })

  if (!existingItem) return res.status(404).json({ error: "Cart item not found" })
  if (existingItem.quantity <= 1) {
    return res.status(400).json({ error: "Quantity cannot be less than 1" })
  }

  const updatedItem = await prisma.cartItem.update({
    where: { id: existingItem.id },
    data: { quantity: { decrement: 1 } }
  })

  res.status(200).json({ message: "Cart item quantity decreased", updatedItem })
})

//Update a single cart item
router.put("/:itemId", async (req, res) => {
  const { itemId } = req.params
  const { quantity } = req.body

  if (quantity < 1) return res.status(400).json({ error: "Quantity must be at least 1" })

  const updateItem = await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity }
  })

  res.status(200).json({ message: "Cart item updated successfully", updateItem })
})

export default router
