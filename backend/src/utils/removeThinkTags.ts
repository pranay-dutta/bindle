/** Removes `<think>` tags from the input text */
const removeThinkTags = (text: string): string => {
  return text.replace(/<think>[\s\S]*?<\/think>/g, "").trim()
}
export default removeThinkTags
