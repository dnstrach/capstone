const oilItems = require('./home.db.json')
const user = require('./cart.db.json')

module.exports = {
    getOils: (req, res) => {
        res.status(200).send(oilItems)
    },

    //will be tied to add to cart button
    addToCart: (req, res) => {
        //console.log(req.body)

        const {id, name, price, img, size} = req.body


        const addedItem = {
            id,
            name,
            img,
            price,
            size,
            quantity: 1
        }

        //look up find index method
        //cb function is taking cart array finding element/object by its id in cart array and matching it to oilItems object by its id  
        const index = user[0].cart.findIndex(cart => cart.id === +req.body.id)
        
        //built in function in find index
        if(index === -1){
            user[0].cart.push(addedItem)
        }else{
            user[0].cart[index].quantity++
        }
    
        //console.log(user[0].cart)
        res.status(200).send(`${addedItem.name} oil added to cart!`)
        
    },

    //tied to cart.html page
    getCart: (req, res) => {

        res.status(200).send(user[0].cart)
    },

    //tied to x button
    deleteOil: (req, res) => {
        //console.log(req.params)
        const index = user[0].cart.findIndex(cart => cart.id === +req.params.id)

        user[0].cart.splice(index, 1)
        //console.log(user[0].cart)

        res.status(200).send(user[0].cart)

    },

    //tied to '+' and '-' buttons
    updateItemQ: (req, res) => {
        const {type} = req.body
        const index = user[0].cart.findIndex(cart => cart.id === +req.params.id)

        if(user[0].cart[index].quantity === 1 && type === 'minus'){
            res.status(400).send("Click x to remove item from list")
        }else if(type === 'plus'){
            user[0].cart[index].quantity++
            console.log(user[0].cart)
            res.status(200).send(user[0].cart)
        }else if(type === 'minus'){
            user[0].cart[index].quantity--
            res.status(200).send(user[0].cart)
        }else{
            res.SendStatus(400)
        }
    }
}