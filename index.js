const express = require('express');
const app = express();
const server = require('http').Server(app);
const port = 8000;

const {ExpressPeerServer} = require('peer');
const PeerServer = ExpressPeerServer(server,{
    debug : true
});

// CONFIGURING THE UUID 
// const {v4 : uuid4} = require('uuid');
// const { Server } = require('http');

// SETTING UP THE VIEW ENGINE 
app.set('view engine','ejs');
app.set('views','./views');

// SETTING UP THE STATIC DIRECTOPRY 
app.use(express.static('assets'));

// CONFIGURING THE ROUTES 
app.use('/peerjs',PeerServer)
app.use('/',require('./routes/index'));

// app.listen(port,err=>{
//     if(err){
//         console.log("Cannot connect to the server",err);
//         return err;
//     }
//     console.log("Successfully connnected to the port at ",port);
// })


const io = require('socket.io')(server);
io.on('connection',socket=>{
    socket.on('join-room',(roomId,userId,username)=>{
        console.log("Joined the room");
        socket.join(roomId);
        socket.to(roomId).emit('user-connected',userId);

        socket.on('message',message=>{
            console.log(username)
            io.to(roomId).emit('createMessage',message,username);
        })
    })
})

server.listen(port,err=>{
    if(err){
        console.log("Cannot connect to the server",err);
        return err;
    }
    console.log("Successfully connnected to the port at ",port);
})

