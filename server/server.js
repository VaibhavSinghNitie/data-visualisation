const app = require("./app")

const port = 8080

app.listen(port, () => {
    console.log(`Visualisation server running on port: ${port}`)
})