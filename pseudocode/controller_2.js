//importing json files into controller
const oilItems = require('./oil.db.json')
const user = require('./user.db.json')

//exporting functions for index.js
//functions are written in object form because request request and response are objects
//req object is passed in as arg by express
//res object is response being sent back to client - needs a status code
//functions dictate what FE should be sending
//logs show in vs code terminal
module.exports = {
    //request sent through endpoint with get method
    //respone is objects in oil.db.json sent to FE
    getOils: (req, res) => {

        //console.log(req.body) // {}

        res.status(200).send(oilItems)
        //sending oil objects in oilItems array to home.js
    },

    addToCart: (req, res) => {
        //console.log(req.body) //specific oil object from oilItems

        //destructuring oilItem object to send cart item as (addedItem) with quantity (key/value)
        const {id, name, price, img, size} = req.body


        const addedItem = {
            id,
            name,
            img,
            price,
            size,
            quantity: 1
        }

        //find index method: returns the index of the first element in an array that satisfies the provided testing function, if no element found returns -1
        //cb function is taking cart array finding element/object by its id in cart array and matching it to oilItems object by its id  
        const index = user[0].cart.findIndex(cart => cart.id === +req.body.id)
        
        //built in function in find index
        //if condition pushing addedItem if not already found in cart
        //else if item is already added find addedItem by its index and increment its quantity
        if(index === -1){
            user[0].cart.push(addedItem)
        }else{
            user[0].cart[index].quantity++
        }
    
        //console.log(user[0].cart) //shows addedItem in cart array and if added again quantity number increases

        //sending message to FE 
        //make FE receive response on home.js
        res.status(200).send(`${addedItem.name} oil added to cart!`)
        
    },


    getCart: (req, res) => {

        //console.log(req.body) // {} shows empty object 

        //sending cart from first user object 
        res.status(200).send(user[0].cart)

        //console.log(user[0].cart)// shows addedItem when opening cart page
    },

    //tied to x button
    deleteOil: (req, res) => {

        //console.log(req.params) // logs which addedItem was deleted by its id // { id: '2' }

        //using find index method to find correct element in cart by its id to match param endpoint
        const index = user[0].cart.findIndex(cart => cart.id === +req.params.id)

        //console.log(index) // 0 // shows 0 with every delete because only have one user in database

        //now can remove addedItem by its id in cart since index has specified element in cart array
        user[0].cart.splice(index, 1)

        res.status(200).send(user[0].cart)
        //console.log(user[0].cart) // shows which addedItem is still in cart

    },

    //tied to '+' and '-' buttons
    updateItemQ: (req, res) => {
        //console.log(req.body) // when increasing or decreasing quan shows addedItem object
        //console.log(req.params) // { id: '1' }

        //destructuring addedItem object to equal type variable
        const {type} = req.body

        //console.log(type) // plus // minus
        //console.log(req.body) // { type: 'plus' } // { type: 'minus' }

        //using find index method to find correct element in cart by its id to match param endpoint
        const index = user[0].cart.findIndex(cart => cart.id === +req.params.id)

        if(user[0].cart[index].quantity === 1 && type === 'minus'){
            res.status(400).send("Click x to remove item from list") //sending message to inspect console
        }else if(type === 'plus'){
            user[0].cart[index].quantity++
            //console.log(user[0].cart) // addedItem objects in cart with quantity changing
            res.status(200).send(user[0].cart)
            //plus is getting sent to FE
            //console.log(user[0].cart) //shows 'plus' 
        }else if(type === 'minus'){
            user[0].cart[index].quantity--
            //console.log(user[0].cart) // addedItem objects in cart with quantity changing
            res.status(200).send(user[0].cart)
            //minus is being sent FE
            //console.log(user[0].cart) //shows 'minus' 
        }else{
            res.SendStatus(400)
        }
    }
}