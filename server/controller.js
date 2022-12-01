const oilItems = require('./home.db.json')
const user = require('./cart.db.json')

module.exports = {
    getOils: (req, res) => {
        res.status(200).send(oilItems)
    },

    //will be tied to add to cart button
    addToCart: (req, res) => {
        console.log(req.body)
        console.log(req.params)

        const {id, name, price, img, size} = req.body


        const addedItem = {
            id,
            name,
            img,
            price,
            size,
            quantity: 1
        }

        //pushing added item into users empty cart in db.json
        user[0].cart.push(addedItem)
        console.log(user[0].cart)
        res.status(200).send(`${addedItem.name} oil added to cart!`)

        //want FE to also send an alert that item was added to cart

    },

    //tied to nav cart button
    getCart: (req, res) => {
        res.status(200).send(user[0].cart)

    },

    //tied to x button
    deleteOil: (req, res) => {
        console.log(req.params)
        const index = user[0].cart.findIndex(cart => cart.id === +req.params.id)

        user[0].cart.splice(index, 1)

        res.status(200).send(user[0].cart)
        
    },

    //tied to '+' and '-' buttons
    updateItemQ: (req, res) => {
        const {type} = req.body
        const index = user[0].cart.findIndex(cart => cart.id === +req.params.id)

        if(user[0].cart[index].quantity === 1 && type === 'minus'){
            res.status(400).send("Click Remove Item from List")
        }else if(user[0].cart[index].quantity && type === 'plus'){
            user[0].cart.quantity++
            res.status(200).send(user[0].cart)
        }else if(user[0].cart[index].quantity && type === 'minus'){
            user[0].cart.quantity--
            res.status(200).send(user[0].cart)
        }else{
            res.SendStatus(400)
        }
    }
}