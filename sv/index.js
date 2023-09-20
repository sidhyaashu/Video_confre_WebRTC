const express = require("express")
const bodyParser = require("body-parser");
const { Server } = require("socket.io")
const dotenv = require("dotenv").config()

const PORT = process.env.PORT
const IO_PORT = process.env.IO_PORT
const io = new Server()
const app = express()

app.use(bodyParser.json())


const emailToSoketMapping = new Map()

io.on("connection",(soket)=>{
    soket.on("join-room",(data)=>{
        const {roomId,email}  = data
        console.log({
            user:"New User",
            email:email,
            roomId:roomId
        })
        emailToSoketMapping.set(email,soket.id)
        soket.join(roomId)
        soket.broadcast.to(roomId).emit(`New user joined`,{email})
    })
})


app.listen(PORT,()=>{
    console.log(`Server listen on port : ${PORT}`)
})
io.listen(IO_PORT);