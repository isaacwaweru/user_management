const express = require('express');
const bodyParser = require('body-parser');
const fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream("yujo.csv");

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "User application. Organize and keep track of all your users."});
});
// Require Users routes
require('./app/routes/user.routes.js')(app);
// listen for requests
app.listen(1234, () => {
    console.log("Server is listening on port 1234");
});

//data
const data = [
    {
        id: "5ec4bfe4242cda08bc97fdfb",
        firstname: "Buda bosss",
        lastname: "Wagwan",
        email: "waweruisaac255477@gmail.com",
        contact: "07062377146461"
    },
    {
        id: "5ec4bfe4242cda08bc97fdfb",
        firstname: "Buda bosss",
        lastname: "Wagwan",
        email: "waweruisaac255477@gmail.com",
        contact: "07062377146461"
    },
    {
        id: "5ec4bfe4242cda08bc97fdfb",
        firstname: "Buda bosss",
        lastname: "Wagwan",
        email: "waweruisaac255477@gmail.com",
        contact: "07062377146461"
    },
    {
        id: "5ec4bfe4242cda08bc97fdfb",
        firstname: "Buda bosss",
        lastname: "Wagwan",
        email: "waweruisaac255477@gmail.com",
        contact: "07062377146461"
    },
    {
        id: "5ec4bfe4242cda08bc97fdfb",
        firstname: "Buda bosss",
        lastname: "Wagwan",
        email: "waweruisaac255477@gmail.com",
        contact: "07062377146461"
    },
    {
        id: "5ec4bfe4242cda08bc97fdfb",
        firstname: "Buda bosss",
        lastname: "Wagwan",
        email: "waweruisaac255477@gmail.com",
        contact: "07062377146461"
    },
    {
        id: "5ec4bfe4242cda08bc97fdfb",
        firstname: "Buda bosss",
        lastname: "Wagwan",
        email: "waweruisaac255477@gmail.com",
        contact: "07062377146461"
    }
]

//clean data
const jsonData = JSON.parse(JSON.stringify(data));
// console.log("jsonData", jsonData);

//json to csv 
fastcsv
  .write(jsonData, { headers: true })
  .on("finish", function() {
    console.log("Write to yujo.csv successfully!");
  })
  .pipe(ws);