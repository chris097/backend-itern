const express = require('express')
const app = express()

const csv = [
    { id : 1}
]

app.get("/", (req, res) => {
    res.send(csv)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))