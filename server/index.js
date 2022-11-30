const express = require('express')
const cors = require('cors')


const app = express()

app.use(express.json())
app.use(cors())

const {getOils, addToCart, getCart} = require('./controller')

app.get('/essential-oils', getOils)
app.post('/add-cart-oil/:id', addToCart)
app.get('/cart', getCart)

app.listen(5501, () => console.log("Server is running on port 5501"))