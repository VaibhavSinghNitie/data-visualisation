const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors({
    origin: "http://localhost:4200"
}));

const graphRouter = require("./routes/graph")

app.use("/graph", graphRouter)

module.exports = app
