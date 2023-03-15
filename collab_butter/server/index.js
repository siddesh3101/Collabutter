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

mongoose.connect(DB).then(() =>{
    console.log("Connection succesfull");
}).catch((e) =>{
    console.log(e);
});

io.on('connection',(socket) =>{
console.log('connected');
socket.on('create-game',async({nickname,name,occupancy,maxRounds}) =>{
    try{

    }catch (e){
        
    }

})
})

server.listen(port,"0.0.0.0",() =>{
    console.log("Server started and running on port " + port);
})
