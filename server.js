// Dependencies
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()
const port = process.env.PORT

// order route
const orderRouter = require('./routes/order')
app.use('/order', orderRouter)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
dotenv.config()

app.get('/', (req, res) => {
    res.json('/')
})

if (port == null || port == "") {
    port = 80;
  }
  app.listen(port);
