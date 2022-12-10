const baseURL = 'http://localhost:5501'

const cart = document.querySelector('.cart-container')
let total = 0 
//showing total is int datatype

//createCartCard and display cart handles object data within cart: []
const getCart = () => {
    axios.get(`${baseURL}/cart`)
        .then((res) => {
            //console.log(res.data) // [] 

            displayCart(res.data)
            console.log(res.data)
            //adding items at first and second index
            //0: {id: 1, name: 'Rose', img: 'https://lh3.googleusercontent.com/pfiZKpvQV9EIBu1g…poiUp4y6rAsspC1zA4oIENQnsc1nZlT9bWLu5Ph8JJo=w2400', price: 18, size: '30 mL', …}
            //1: {id: 2, name: 'Eucalyptus', img: 'https://lh3.googleusercontent.com/VDJixqoFEen2_tgi…1UoHcQOXQWrL96BFu1FpOlWnFzWGmT9rkQRHffFekTs=w2400', price: 18, size: '30 mL', …}
            length: 2

        })
        .catch((err) => {
            console.log(err)
        })
}

const deleteItem = (id) => {
    //console.log(id) // for rose...1 because id = 1
    document.getElementById('total').textContent= ``
    axios.delete(`${baseURL}/cart/${id}`)
        .then((res) => {
            //console.log(res.data) //[] if adding one item // shows current items in cart array
            cart.innerHTML = ``
            //array is empty, but need to clear out deleted items on web page
            displayCart(res.data)
            //console.log(res.data) //[] if adding one item // shows current items in cart array
        })
        .catch((err) => {
            console.log(err)
        })
}

const updateItemQ = (id, type) => {
    axios.put(`${baseURL}/cart/${id}`, {type})
        .then((res) => {
            //console.log(res.data) //increasing first object in user's cart by 1
            //id: 1
            // img: "https://lh3.googleusercontent.com/pfiZKpvQV9EIBu1gfV9TDJOc6f3wBBXC0_YByqDeQrbVmn32nYk6g_qlsTpON0uSvKcqgC95ZpcgjlBp-FjD2EDK8lPxzx7zpoiUp4y6rAsspC1zA4oIENQnsc1nZlT9bWLu5Ph8JJo=w2400"
            // name: "Rose"
            // price: 18
            // quantity: 2
            // size: "30 mL"
            cart.innerHTML = ``
            //clears cart container from items with changed quantities 
            displayCart(res.data)
            //displaying updated qunatity in item card
        })
}

const displayCart = (addedItems) => {
    console.log(addedItems)
        //console.log(addedItem)
        //receiving oilItem(s) from user.db.json file and changing card content
        //{id: 2, name: 'Eucalyptus', img: 'https://lh3.googleusercontent.com/VDJixqoFEen2_tgi…1UoHcQOXQWrL96BFu1FpOlWnFzWGmT9rkQRHffFekTs=w2400', price: 18, size: '30 mL', …}
    //setting value for total
    total = 0
    //if array is empty
    if(addedItems.length === 0){
        //creating message element
        let cartMsg = document.createElement('p')
        cartMsg.classList.add('cart-msg')
        cartMsg.textContent = "Cart is empty!"
        //displaying message in cart container
        cart.appendChild(cartMsg)
    }else{
        //looping through items added in user's cart from user json file
        for (let i = 0; i < addedItems.length; i++){
            //adding each item into new card 
            createCartCard(addedItems[i])
        }
    }
}

//creating individual card <sections> for cart items 
//onclick: occurs when user clicks on HTML element...onclick="function(arguments: id#, type)"
const createCartCard = (addedItem) => {
    //console.log(addedItem)
    //receiving oilItem from user.db.json file and changing card content
    //{id: 2, name: 'Eucalyptus', img: 'https://lh3.googleusercontent.com/VDJixqoFEen2_tgi…1UoHcQOXQWrL96BFu1FpOlWnFzWGmT9rkQRHffFekTs=w2400', price: 18, size: '30 mL', …}
    total += addedItem.price * addedItem.quantity
    //changing total amount as quantity increases or decreases
    const cartCard = document.createElement('section')
    cartCard.classList.add('cart-card')

    cartCard.innerHTML = `
        <div class="cart-content">
            <div class="img-name">
                <button id="delete-btn" onclick="deleteItem(${addedItem.id})"> x </button>
                <img class="oil-image" alt="oil-image" src=${addedItem.img}>
                <p id="oil-name">${addedItem.name}</p>
            </div>
                <div class="size-quantity-price">
                    <p id="oil-size">Size: ${addedItem.size}</p>
                        <div class="quantity">
                            <button id="minus-btn" onclick="updateItemQ(${addedItem.id}, 'minus')"> - </button>
                            <p id="oil-quantity">Quantity: ${addedItem.quantity}</p>
                            <button id="plus-btn" onclick="updateItemQ(${addedItem.id}, 'plus')"> + </button>
                        </div>
                    <p id="oil-price">Price: $${addedItem.price}</p>
                </div>
        </div>
        <hr id="item-divider">
    `

    //placing new card in cart container
    cart.appendChild(cartCard)

    //selecting p tag and setting its content to displayed total 
    document.getElementById('total').textContent = `Total: $${total}.00`

}

getCart()
