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
const DB = 'mongodb+srv://siddushetty30:Siddesh3125@cluster0.mbwydne.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB).then(() =>{
    console.log("Connection succesfull");
}).catch((e) =>{
    console.log(e);
});

io.on('connection',(socket) =>{
console.log('connected');
//create-room-callback
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

});

socket.on('join-game', async ({nickname,name}) => {
    try{
        let room = await Room.findOne({name});
        if(!room){
            socket.emit('notCorrectGame','Room with that name doesnt exist');
            return;
        }

        if(room.isJoin){
            let player = {
                socketID:socket.id,
                nickname,
            }

            room.players.push(player);
            socket.join(name);
            if(room.players.length === room.occupancy){
                room.isJoin = false;
            }
            room.turn = room.players[room.turnIndex];
            room = await room.save();
            io.to(name).emit('updateRoom',room);
        }else{
            socket.emit('notCorrectGame','The game is in progress please try later');
        }


    }catch(e){

    }
})
})


server.listen(port,"0.0.0.0",() =>{
    console.log("Server started and running on port " + port);
})
