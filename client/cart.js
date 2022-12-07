const baseURL = 'http://localhost:5501'

const cart = document.querySelector('.cart-container')
const minusbtn = document.getElementById('minus-btn')
let total = 0 

const getCart = () => {
    axios.get(`${baseURL}/cart`)
        .then((res) => {

            displayCart(res.data)

        })
        .catch((err) => {
            console.log(err)
        })
}

const deleteItem = (id) => {
    document.getElementById('total').textContent= ``
    axios.delete(`${baseURL}/cart/${id}`)
        .then((res) => {
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
            cart.innerHTML = ``
            displayCart(res.data)
        })
}

const displayCart = (addedItems) => {
    total = 0
    if(addedItems.length === 0){
        let cartMsg = document.createElement('p')
        cartMsg.classList.add('cart-msg')
        cartMsg.textContent = "Cart is empty!"
        cart.appendChild(cartMsg)
    }else{
        cart.innerHTML = ``
        for (let i = 0; i < addedItems.length; i++){
            createCartCard(addedItems[i])
        }
    }
}

const createCartCard = (addedItem) => {
    total += addedItem.price * addedItem.quantity
    const cartCard = document.createElement('section')
    cartCard.classList.add('cart-card')

    cartCard.innerHTML = `
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
        <hr id="item-divider">
    `
    cart.appendChild(cartCard)

    document.getElementById('total').textContent= `Total: $${total}.00`

}

getCart()
