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
const createOilCard = (oil) => {
    const OilCard = document.createElement('section')
    OilCard.classList.add('oil-card')

    OilCard.innerHTML = `
        <img alt="oil-image" src=${oil.img}>
        <p>${oil.name}</p>
        <p>${oil.price}</p>
        <p>${oil.size}</p>
        <button id="${oil.id}">Add to Cart</button>
    `
    oils.appendChild(OilCard)
    document.getElementById(`${oil.id}`).addEventListener('click', () => {
        addToCart(oil)
    })
    
}

//Need to create stopper for add to cart button can only add item once or figure out way to also connect add to cart button to quantity

//add to cart function receiving oil body object as parameter
//logging oil to show object in inspect
//axios.post with endpoint (not needing param because included in oil object) and oil object
//responding with alert with response message from BE
const addToCart = (oil) => {
    //console.log(oil)
    axios.post(`${baseURL}/cart`, oil)
        .then((res) => {
            alert(res.data)
        })
        .catch(error => {
            console.log(error)
        })
}

getAllOils()