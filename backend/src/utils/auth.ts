import { verifyToken, createClerkClient } from "@clerk/backend"
import { Request } from "express"

/**
 * Validates the user by verifying the JWT token from the Authorization header.
 * @param req - The Express request object containing the headers.
 * @returns The user object if the token is valid, otherwise returns null.
 */
export const validateUser = async (req: Request) => {
  const authHeader = req.headers.authorization
  const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })
  if (!authHeader) return null

  const token = authHeader.replace("Bearer ", "")
  if (!token) return null

  try {
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY
    })
    const user = await clerkClient.users.getUser(payload.sub)
    return user
  } catch (error) {
    return null
  }
}
