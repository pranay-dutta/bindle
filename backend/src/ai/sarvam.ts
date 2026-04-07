import { SarvamAIClient } from "sarvamai"
import type { SarvamAI } from "sarvamai"
import "dotenv/config"

const client = new SarvamAIClient({
  apiSubscriptionKey: process.env.SARVAM_API_KEY
})

type Message = SarvamAI.ChatCompletionRequestMessage

interface StreamChunk {
  choices?: Array<{
    delta?: {
      content?: string | null
    }
  }> | null
}

const callSarvam = async (messages: Message[]): Promise<AsyncIterable<StreamChunk>> => {
  const response = await client.chat.completions({
    model: "sarvam-30b",
    messages,
    temperature: 0.7,
    top_p: 1,
    stream: true
  })
  return response as AsyncIterable<StreamChunk>
}

export { callSarvam }
