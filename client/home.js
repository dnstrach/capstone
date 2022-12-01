//const { default: axios } = require("axios")

const baseURL = 'http://localhost:5501'

const oils = document.querySelector('#oils-container')
const addCartbtns = document.getElementsByClassName('oil-card')


//axios get request and invoking at bottom of page initally only shows oilItems json in inspect
//invoking displayOils function in getAllOils containing oilItems array to show all oils in their cards on page
const getAllOils = () => {
    axios.get(`${baseURL}/oils`)
        .then((res) => {
            //console.log(res.data)
            //shows oilItems array in inspect console

            displayOils(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

//looping through array pulling each individual object 
//invoking createOilCard function inside displayOils with individual object to create and input card info
const displayOils = (oilItems) => {
    for(let i = 0; i < oilItems.length; i++){
        //console.log(oilItems[i])
        //will show 8 separate logs of objects in inspect console

        createOilCard(oilItems[i])
    } 
}

//creating oil 'cards' in it's own section with class
//inner.html allows each card to contain data from oilItem object
//adding each oil card to oils container as child
//getting button by id and adding click event listener with callback function invoking addToCart(oil)
const createOilCard = (oilItem) => {
    const oilCard = document.createElement('section')
    oilCard.classList.add('oil-card')

    oilCard.innerHTML = `
        <img alt="oil-image" src=${oilItem.img}>
        <p>${oilItem.name}</p>
        <p>${oilItem.price}</p>
        <p>${oilItem.size}</p>
        <button id="${oilItem.id}">Add to Cart</button>
    `
    oils.appendChild(oilCard)
    document.getElementById(`${oilItem.id}`).addEventListener('click', () => {
        addToCart(oilItem)
    })
    
}

//Need to create stopper for add to cart button can only add item once or figure out way to also connect add to cart button to quantity

//add to cart function receiving oil body object as parameter
//logging oil to show object in inspect
//axios.post with endpoint (not needing param because included in oil object) and oil object
//responding with alert with response message from BE
const addToCart = (oilItem) => {
    console.log(oilItem)
    axios.post(`${baseURL}/cart`, oilItem)
        .then((res) => {
            alert(res.data)
        })
        .catch(error => {
            console.log(error)
        })
}

getAllOils()