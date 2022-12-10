//server built with node

//BOILER PLATE
//install nodemon if not already installed (run npm install -g nodemon)
//nodemon works for compiled files whereas node works for individual files
//add packages (package.json and node_modules) by running npm init -y (-y saying yes to default settings)

//express for building server with node - makes it easier for matching HTTP methods nad using endpoints with FE responses and requests
//importing express
const express = require('express')
//importing cors (cross origin resource sharing) provides accessibility with ports
const cors = require('cors')

const app = express()

//MIDDLEWARE - external code that runs each time server starts
//allowing express to accept JSON
app.use(express.json())
app.use(cors())
//run npm i axios cors express to install packages being used for project

//importing controller 
const {getOils, addToCart, getCart, deleteOil, updateItemQ} = require('./controller')

//refactoring code

//corresponding axios requests with endpoint and handler function
//after endpoints are created test with postman by attaching endpoints to base URL
//endpoint contains body
app.get('/oils', getOils)
//postman get request shows array with objects in oilItems.db.json
//endpoint contains body
app.post('/cart', addToCart)
//endpoint contains body
//posted to empty cart array is addedItem object
app.get('/cart', getCart)
//endpoint contains objects(addedItems) in cart array
app.delete('/cart/:id', deleteOil)
//endpoint with param to delete which object by its id number
app.put('/cart/:id', updateItemQ)
//endpoint with param to update which object by its id number

//opens port to server
//run nodemon with file name (change main to server/index.js in package.json)
app.listen(5501, () => console.log("Server is running on port 5501"))