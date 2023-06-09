require('@google-cloud/debug-agent').start()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const router = require('./routes/record.js')

app.use(bodyParser.urlencoded({extended: true}))
app.use(router)

app.get("/", (req, res) => {
  console.log("Response success")
  res.send("Response Success!")
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log("Server is up and listening on " + PORT)
})