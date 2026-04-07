import { prisma } from "../../lib/prisma"

export const clearCartForUser = async (userId: string) => {
  await prisma.cartItem.deleteMany({
    where: { cart: { userId } }
  })
}