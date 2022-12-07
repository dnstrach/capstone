const baseURL = 'http://localhost:5501'

const oils = document.querySelector('.oils-container')
const addCartbtns = document.getElementsByClassName('oil-card')

const getAllOils = () => {
    axios.get(`${baseURL}/oils`)
        .then((res) => {
            displayOils(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

const displayOils = (oilItems) => {
    for(let i = 0; i < oilItems.length; i++){

        createOilCard(oilItems[i])
    } 
}

const createOilCard = (oilItems) => {
    const oilCard = document.createElement('section')

    oilCard.innerHTML = `
        <div class="items">
            <img class="oil-image" alt="oil-image" src=${oilItems.img}>
            <div class="name-price-size">
                <p class="oil-content "id="oil-name">${oilItems.name}</p>
                    <div class="price-size">
                        <p id="oil-price">Price: $${oilItems.price}</p>
                        <p id="oil-size"> Size: ${oilItems.size}</p>
                    </div>
            </div>
            <button class="add-cart-btn" id="${oilItems.id}">Add to Cart</button>
        </div>
        <hr id="row-divider">
    `
    oils.appendChild(oilCard)

    document.getElementById(`${oilItems.id}`).addEventListener('click', () => {
        addToCart(oilItems)
        console.log(oilItems)
    })
    
}

const addToCart = (oilItem) => {
    axios.post(`${baseURL}/cart`, oilItem)
        .then((res) => {
            alert(res.data)
        })
        .catch(error => {
            console.log(error)
        })
}

getAllOils()