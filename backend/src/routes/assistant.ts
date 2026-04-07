import { Router, type Request, type Response } from "express"
import { SarvamAI } from "sarvamai"
import { callSarvam } from "../ai/sarvam"

const router = Router()


const handleAssistant = async (req: Request, res: Response) => {
  const messages = req.body

  // Set streaming headers for Server-Sent Events (SSE)
  res.setHeader("Content-Type", "text/event-stream")
  res.setHeader("Cache-Control", "no-cache")
  res.setHeader("Connection", "keep-alive")
  res.setHeader("X-Accel-Buffering", "no")

  try {
    const stream = await callSarvam(messages as SarvamAI.ChatCompletionRequestMessage[])

    for await (const chunk of stream) {
      const content = chunk.choices?.[0]?.delta?.content
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`)
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`)
    res.end()
  } catch (error) {
    res.write(`data: ${JSON.stringify({ error: String(error) })}\n\n`)
    res.end()
  }
}

router.post("/", handleAssistant)
router.get("/", handleAssistant)

export default router
