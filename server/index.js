const express = require('express')
const cors = require('cors')


const app = express()

app.use(express.json())
app.use(cors())

const {getOils, addToCart, getCart, deleteOil, updateItemQ} = require('./controller')

app.get('/oils', getOils)
app.post('/cart', addToCart)
app.get('/cart', getCart)
app.delete('/cart/:id', deleteOil)
app.put('/cart/:id', updateItemQ)

app.listen(5501, () => console.log("Server is running on port 5501"))