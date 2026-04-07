import { prisma } from "../../lib/prisma"
import { validateUser } from "../utils/auth"
import { Router } from "express"

const router = Router()

// Get all addresses for the authenticated user
router.get("/all", async (req, res) => {
  const user = await validateUser(req)
  if (!user) return res.status(401).json({ error: "Unauthorized" })

  const addresses = await prisma.address.findMany({
    where: { userId: user.id }
  })

  res.status(200).json({ message: "Addresses retrieved successfully", addresses })
})

// Create a new address for the authenticated user
router.post("/create", async (req, res) => {
  const user = await validateUser(req)
  if (!user) return res.status(401).json({ error: "Unauthorized" })

  await prisma.address.create({
    data: {
      userId: user.id,
      ...req.body
    }
  })
  return res.status(201).json({ message: "Address created successfully" })
})

// Update an address by ID for the authenticated user
router.patch("/update/:id", async (req, res) => {
  const user = await validateUser(req)
  if (!user) return res.status(401).json({ error: "Unauthorized" })
  const addressId = req.params.id

  const address = await prisma.address.updateMany({
    where: { id: addressId, userId: user.id },
    data: req.body
  })
  return res.status(200).json({ message: "Address updated successfully", address })
})

//Delete an address by ID for the authenticated user
router.delete("/delete/:id", async (req, res) => {
  const user = await validateUser(req)
  if (!user) return res.status(401).json({ error: "Unauthorized" })

  const addressId = req.params.id
  const address = await prisma.address.delete({
    where: { id: addressId, userId: user.id }
  })

  return res.status(200).json({ message: "Address deleted successfully", address })
})

// Set an address as default for the authenticated user
router.patch("/default/:id", async (req, res) => {
  const user = await validateUser(req)
  if (!user) return res.status(401).json({ error: "Unauthorized" })

  const addressId = req.params.id

  // Set all addresses of the user to non-default
  await prisma.address.updateMany({
    where: { userId: user.id },
    data: { isDefault: false }
  })

  // Set the specified address as default
  const address = await prisma.address.update({
    where: { id: addressId, userId: user.id },
    data: { isDefault: true }
  })
  return res.status(200).json({ message: "Default address set successfully", address })
})

export default router
