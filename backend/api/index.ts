import express from "express"
import routers from "../src/routes"
import cors from "cors"
import morgan from "morgan"

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use(routers)

app.get("/", (_, res) => {
  res.json("Bindle backend is running...")
})

if (!process.env.VERCEL) {
  const port = Number(process.env.PORT ?? 3000)
  app.listen(port, () => {
    console.log(`Bindle backend is running on port ${port}`)
  })
}

export default app
