import requireAuth from "../middlewares/requireAuth"
import { Router } from "express"
import { prisma } from "../../lib/prisma"

const router = Router()

//Update a single cart item
router.put("/:itemId", requireAuth, async (req, res) => {
  const { itemId } = req.params
  const { quantity } = req.body

  if (quantity < 1) {
    return res.status(400).json({ error: "Quantity must be at least 1" })
  }

  const updateItem = await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity }
  })

  res.status(200).json({ message: "Cart item updated successfully", updateItem })
})

//Delete a single cart item
router.delete("/:itemId", requireAuth, async (req, res) => {
  const { itemId } = req.params

  await prisma.cartItem.delete({
    where: { id: itemId }
  })

  res.status(200).json({ message: "Item removed" })
})

//Create a single cart item
router.post("/create", requireAuth, async (req, res) => {
  const userId = req.user.sub

  //Create of fetch cart of current user
  const cart = await prisma.cart.upsert({
    where: { userId },
    create: { userId },
    update: {}
  })

  const existingItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, bookTitle: req.body.bookTitle }
  })

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + 1 }
    })
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        bookTitle: req.body.bookTitle,
        image: req.body.image,
        price: req.body.price,
        quantity: 1
      }
    })
  }
  res.status(201).json({ message: "Item added to cart" })
})

export default router
