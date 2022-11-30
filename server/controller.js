const oilItems = require('./home.db.json')
const user = require('./cart.db.json')

module.exports = {
    getOils: (req, res) => {
        res.status(200).send(oilItems)
    },

    //will be tied to add to cart button
    addToCart: (req, res) => {
        let {name, price, size} = req.body
        let {id} = req.params

        let index = oilItems.findIndex(oilItems => oilItems.id === +id)

        const addedItem = {
            id,
            name,
            price,
            size,
            quantity: 1
        }

        user[i].cart += (addedItem[index].id)

        //how to push id int into cart's empty array value in userCart
        //userCart['cart'].push(addedItem.id)

        res.status(200).send(addedItem)

        //want FE to also send an alert that item was added to cart

    },

    getCart: (req, res) => {
        let cartItems = []

        for(let i = 0; i < user.cart.length; i++)
            if(user.cart[i] === oilItems.id){
                cartItems.push({
                    name: oilItems.name,
                    price: oilItems.price,
                    size: oilItems.size,
                    quantity: 1
                })
            }

        res.status(200).send(cartItems)

    },

    deleteItem: (req, res) => {
        //delete based on param
        
    },

    itemTotal: (req, res) => {
        //based on param and quantity as req.body
        //limit to not into negative 

    }
}