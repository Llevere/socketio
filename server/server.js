import cors from 'cors'
import express from "express";
import { Server } from "socket.io";
const app = express();

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
  }));


const PORT = 3500;
const expressServer = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
    });
    
const io = new Server(expressServer, {
cors: {
    origin: ["http://localhost:3000"],
},
});

const room = 'room';

io.on("connection", socket => {
    console.log(`Socket ${socket.id} connected`)

    socket.join(room);

    socket.on("message", msg => {
        console.log("Getting message: " + msg)
        io.to(room).emit("message", msg);
    })
})

