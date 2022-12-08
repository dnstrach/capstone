#Essential Oil Blends
===========

Essential Oil Blends is a fullstack web application designed for consumer shopping. This application breaks down the basics of creating an online shopping site with an items home page and shopping cart page. 

##Technologies
JavaScript, HTML/CSS, Nodemon, Axios, Cors, Express

##Installation

###Server

####Nodemon
1. Install nodemon to run code for compiled files
..*Run npm install -g nodemon on your system
2. Initialize nodemon
//*Run npm init -y ---> creates package.json file

####Express
1. Install express to build server, match HTTP methods and use endpoint from front end requests
..*run npm install express

####Cors
2. Install cors to for port accessibility 
..*Run npm install cors

####Run Server
1. Use the following boiler plate 
```javascript
//importing express
const express = require('express')
//importing cors
const cors = require('cors')

const app = express()

//MIDDLEWARE - external code that runs each time server starts
//allowing express to accept JSON
app.use(express.json())
//invoking cors
app.use(cors())

//opens port to server
app.listen(5501, () => console.log("Server is running on port 5501"))
```
2. Change main to server/index.js in package.json
3. Run nodemon...if server is running will see console.log above in terminal

###Front End

####Axios
1. Install axios to allow server requests by making http requests and using URLs to communicate with server using JSON
..*Run npm install axios
2. Import axios in html file(s)
```html
    <!-- import axios -->
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

##Overall Process
The overall process for this project was to create separate files for the home and cart web pages. The database contains two JSON files. The first file contains the oil items' data. The second file contains user data with an empty cart array. The cart page has access to the oil data through a post request where added items are being pushed to the empty array. In addition, the front end functionality and html/css design are separated into two files.

##Future Improvements
Future improvements for this project are adding API integration and a relational database such as PostgreSQL. These additions are essential for user and inventory data as the website grows. 