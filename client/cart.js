const baseURL = 'http://localhost:5501'

const cart = document.querySelector('#cart-container')
let total = 0 
//look up global id variable

const getCart = () => {
    axios.get(`${baseURL}/cart`)
        .then((res) => {
            console.log(res.data)

            displayCart(res.data)

        })
        .catch((err) => {
            console.log(err)
        })
}

const deleteItem = (id) => {
    axios.delete(`${baseURL}/cart/${id}`)
        .then((res) => {
            //console.log(res.data)
            cart.innerHTML = ``
            displayCart(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

const updateItemQ = (id, type) => {
    axios.put(`${baseURL}/cart/${id}`, {type})
        .then((res) => {
            //console.log(res.data)
            cart.innerHTML = ``
            displayCart(res.data)
        })
}

const displayCart = (addedItems) => {
    for (let i = 0; i < addedItems.length; i++){
        createCartCard(addedItems[i])
    }
}

const createCartCard = (addedItem) => {
    total += addedItem.price
    const cartCard = document.createElement('section')
    cartCard.classList.add('cart-card')

    cartCard.innerHTML = `
        <button onclick="deleteItem(${addedItem.id})"> x </button>
        <img alt="oil-image" src=${addedItem.img}>
        <p>${addedItem.name}</p>
        <p>${addedItem.size}</p>
        <button onclick="updateItemQ(${addedItem.id}, 'minus')"> - </button>
        <p>${addedItem.quantity}</p>
        <button onclick="updateItemQ(${addedItem.id}, 'plus')"> + </button>
        <p>$${addedItem.price}</p>
    `
    cart.appendChild(cartCard)

    //placed inside createCartCard function to have access to price and be one level lower than global variable
    document.getElementById('total').textContent= `Total: $${total}.00`
}

getCart()

//axios.get(url/endpoint, cb)
//.then(res.data) data is the added item in empty cart array 
//event listener to nav btn (click, cb)

