const express = require("express");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
require("dotenv").config();

const PORT = process.env.PORT;
const IO_PORT = process.env.IO_PORT;
const io = new Server({
  cors: true,
});
const app = express();

app.use(bodyParser.json());

const emailToSoketMapping = new Map();
const soketToEmailMapping = new Map()

io.on("connection", (soket) => {
  soket.on("join-room", (data) => {
    const { roomId, email } = data;
    console.log({
      user: "New User",
      email: email,
      roomId: roomId,
    });
    emailToSoketMapping.set(email, soket.id);
    soketToEmailMapping.set(soket.id,email)
    soket.join(roomId);
    soket.emit("joined-room", { roomId });
    soket.broadcast.to(roomId).emit(`user-joined`, { email });
  });

  soket.on("call-user",(data)=>{
    const { email, offer } = data;
    const fromEmail = soketToEmailMapping.get(soket.id) 
    const soketId = emailToSoketMapping.get(email)
    soket.to(soketId).emit("incoming-call",{from:fromEmail,offer})
  });

  soket.on("call-accepted", (data) => {
    const { email, ans } = data;
    const soketId = emailToSoketMapping.get(email)
    soket.to(soketId).emit("call-accepted",{ans});
  });
});

app.listen(PORT, () => {
  console.log(`Server listen on port : ${PORT}`);
});
io.listen(IO_PORT);
