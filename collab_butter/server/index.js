const express =  require("express");
var http = require("http");
const app =  express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
const mongoose = require("mongoose");

var io = require("socket.io")(server);

//middleware


app.use(express.json());

//connect to mongodb
const DB = 'mongodb+srv://siddushetty30:Siddesh3125@cluster0.mbwydne.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(DB).then(() =>{
    console.log("Connection succesfull");
}).catch((e) =>{
    console.log(e);
})

server.listen(port,"0.0.0.0",() =>{
    console.log("Server started and running on port " + port);
})
