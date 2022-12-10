//axios allows server requests by making http requests and using URLs to communicate with server using JSON
//axios works asynchronously and returns promises - requests is what connects FE and BE
//DOM manipulation to change page based on response
//promise holds response object from http request...if promise successful will use .then() method

//:port choose between 4000 - 6000
const baseURL = 'http://localhost:5501'

//needed for createOilCard function
const oils = document.querySelector('.oils-container')
const addCartbtns = document.getElementsByClassName('oil-card')


//axios get request and invoking at bottom of page initally only shows oilItems json in inspect
//invoking at first without card and display functions shows unfiltered data on page
//invoking displayOils function in getAllOils containing oilItems array to show all oils in their cards on page
const getAllOils = () => {
    axios.get(`${baseURL}/oils`)
        .then((res) => {
            //console.log(res.data)
            //shows oilItem objects in array in inspect console
            // 0: {id: 1, name: 'Rose', img: 'https://lh3.googleusercontent.com/pfiZKpvQV9EIBu1g…poiUp4y6rAsspC1zA4oIENQnsc1nZlT9bWLu5Ph8JJo=w2400', price: 18, size: '30 mL'}
            // 1: {id: 2, name: 'Eucalyptus', img: 'https://lh3.googleusercontent.com/VDJixqoFEen2_tgi…1UoHcQOXQWrL96BFu1FpOlWnFzWGmT9rkQRHffFekTs=w2400', price: 18, size: '30 mL'}
            // 2: {id: 3, name: 'Jasmine', img: 'https://lh3.googleusercontent.com/Xt4K6ES1YaZvMzWa…oclVcFm7gcflwwHd9n7PM_XgWyOU3vBtlgqzcjwktvM=w2400', price: 18, size: '30 mL'}
            // 3: {id: 4, name: 'Lavendar', img: 'https://lh3.googleusercontent.com/ph8iAVavf9LpMGyd…R_EXUyjM8_2Zyg3YLmsAdxDJJYPINdm9iwn8m9II09A=w2400', price: 18, size: '30 mL'}
            // 4: {id: 5, name: 'Citrus', img: 'https://lh3.googleusercontent.com/nMRTwoFqgq7mVIgF…OQKvDyrJxiwzkqMiDbqYEdMZf4u5PBXK_j-eckylsqY=w2400', price: 18, size: '30 mL'}
            // 5: {id: 6, name: 'Chamomile', img: 'https://lh3.googleusercontent.com/5Y1cMhePt5ZSlRvg…Bou0ytfmZphOiXTXQp7RQD59Kurr3G8mD_FYPlACOUE=w2400', price: 18, size: '30 mL'}
            // 6: {id: 7, name: 'Coconut', img: 'https://lh3.googleusercontent.com/Q1azp6NjDEjAEkg8…0uMemjDdBGslfhODm0jRmwWDT4uEWnGnSYymOgSGCNE=w2400', price: 18, size: '30 mL'}
            // 7: {id: 8, name: 'Lemon Grass', img: 'https://lh3.googleusercontent.com/i9j-YYc5Xg-S-mYv…Vi1F7MVp3J6HA4DxDZcJeMSzXiN2ulpxSRWajWM-HVg=w2400', price: 18, size: '30 mL'}
            // 8: {id: 9, name: 'Cinnamon', img: 'https://lh3.googleusercontent.com/URB06ITAA7dd8coD…1VNTgZo21Cy3Cvv00jPhx_vh2fhMTwJEgqhPZGpQEMc=w2400', price: 18, size: '30 mL'}
            // length: 9

            //oilItems sent from server 
            //promise: handling data with createCard function and displaying individual oil items
            //get request responds by sending FE structured data to page
            displayOils(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

//looping through array pulling each individual object 
//invoking createOilCard function inside displayOils with individual object to create and input card info to display on page
const displayOils = (oilItems) => {
    console.log(oilItems) objects in oilItems json
    for(let i = 0; i < oilItems.length; i++){
        //console.log(oilItems[i])
        //will show 8 separate logs of objects in inspect console

        //sends individual oil object into createCard to display each key's values with correct oilItem
        createOilCard(oilItems[i])
        //console.log(oilItems[i]) // separates objects and removes array
    } 
}

//creating oil 'cards' in it's own html section with class
//inner.html allows each card to contain data from oilItem object
//adding each oil card to oils container as child
//getting button by id and adding click event listener with callback function invoking addToCart(oilItems)
const createOilCard = (oilItems) => {
    //saving each card section into variable to append as child to oils-container
    const oilCard = document.createElement('section')
    //oilCard.classList.add('oil-card') //not necessary to add class

    //destructuring objects in oil json to get corresponding values
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

            <!-- button tied to id int -->
            <button class="add-cart-btn" id="${oilItems.id}">Add to Cart</button>
        </div>
        <hr id="row-divider">
    `

    //placing card <section> inside of oils container 
    oils.appendChild(oilCard)

    //adding event listener to add to cart button
    document.getElementById(`${oilItems.id}`).addEventListener('click', () => {
        //invoking addToCart to post oilItem object in cb
        addToCart(oilItems)
        //console.log(oilItems) //added oilItem object

    })
    
}

//add to cart function receiving oil body object as parameter
//logging oil to show object in inspect
//axios.post with endpoint (not needing param because included in oil object) and oil object
//responding with alert with response message from BE
const addToCart = (oilItem) => {
    //console.log(oilItem) //shows object based on button connected to objects id
    //{id: 3, name: 'Jasmine', img: 'https://lh3.googleusercontent.com/Xt4K6ES1YaZvMzWa…oclVcFm7gcflwwHd9n7PM_XgWyOU3vBtlgqzcjwktvM=w2400', price: 18, size: '30 mL'}
    
    //args: endpoint and object
    axios.post(`${baseURL}/cart`, oilItem)
        .then((res) => {
            //response message sent from server sending to page as an alert
            alert(res.data)
        })
        .catch(error => {
            console.log(error)
        })
}

getAllOils()