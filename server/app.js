const express = require('express')
const app = express()

const graphRouter = require("./routes/graph")

app.use("/graph", graphRouter)

module.exports = app