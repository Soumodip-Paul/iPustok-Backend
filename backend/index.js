const dotenv = require('dotenv')
dotenv.config()

const mongo = require("./db")
mongo();

const express = require('express')
const app = express()
const port = process.env.PORT
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use("/api/auth",require("./routes/auth"))
app.use("/api/notes",require("./routes/Note"))
app.use("/api/page",require("./routes/page"))
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
