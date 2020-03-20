// Dependencies
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()
const port = process.env.PORT
app.use(cors())

// order route
const orderRouter = require('./routes/order')
app.use('/order', orderRouter)

app.use(express.json())
app.use(express.urlencoded({extended: false}))
dotenv.config()

app.get('/', (req, res) => {
    res.json('/')
})

if (port == null || port == "") {
    port = 8080;
  }
  app.listen(port);
