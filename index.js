const dotenv = require('dotenv')
dotenv.config()

const mongo = require("./db")
mongo();

const express = require('express')
const app = express()
const port = process.env.PORT

app.use(express.json())

app.use("/api/auth",require("./routes/auth"))
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
