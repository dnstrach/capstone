const oilItems = require('./oil.db.json')
const user = require('./user.db.json')

module.exports = {
    getOils: (req, res) => {
        res.status(200).send(oilItems)
    },

    addToCart: (req, res) => {

        const {id, name, price, img, size} = req.body

        const addedItem = {
            id,
            name,
            img,
            price,
            size,
            quantity: 1
        }
 
        const index = user[0].cart.findIndex(cart => cart.id === +req.body.id)
        
        if(index === -1){
            user[0].cart.push(addedItem)
        }else{
            user[0].cart[index].quantity++
        }
    
        res.status(200).send(`${addedItem.name} oil added to cart!`)
        
    },

    getCart: (req, res) => {

        res.status(200).send(user[0].cart)
    },

    deleteOil: (req, res) => {
        const index = user[0].cart.findIndex(cart => cart.id === +req.params.id)

        user[0].cart.splice(index, 1)

        res.status(200).send(user[0].cart)

    },

    updateItemQ: (req, res) => {
        const {type} = req.body
        const index = user[0].cart.findIndex(cart => cart.id === +req.params.id)

        if(user[0].cart[index].quantity === 1 && type === 'minus'){
            res.status(400).send("Click x to remove item from list")
        }else if(type === 'plus'){
            user[0].cart[index].quantity++
            res.status(200).send(user[0].cart)
        }else if(type === 'minus'){
            user[0].cart[index].quantity--
            res.status(200).send(user[0].cart)
        }else{
            res.SendStatus(400)
        }
    }
}