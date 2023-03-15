const express =  require("express");
var http = require("http");
const app =  express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
const mongoose = require("mongoose");
const Room = require("./models/Room");
const getWord = require("./apis/getword");

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
        const exisitingRoom = await Room.findOne({name});
        if(exisitingRoom){
            socket.emit('notCorrectGame','Room with that name already exists');
            return;
        }

        let room = new Room();
        const word = getWord();
        room.word = word;
        room.name = name;
        room.maxRounds = maxRounds;
        room.occupancy = occupancy;

        let player = {
            socketID : socket.id,
            nickname,
            isPartyLeader: true,

        }

        room.players.push(player);
        room = await room.save();
        socket.join(room);
        io.to(name).emit('updateRoom',room);

    }catch (e){
        console.log(e);
    }

})
})

server.listen(port,"0.0.0.0",() =>{
    console.log("Server started and running on port " + port);
})
