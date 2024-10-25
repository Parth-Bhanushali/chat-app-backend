import express from "express";
import cors from "cors";
import { getSocket, initSocket } from "./config/socket";
import http from "http"; 
import connectDatabase from "./config/db";
import dotenv from "dotenv";
import { authRoutes, chatRoutes } from "./routes"

dotenv.config();

const app = express();
const server = http.createServer(app);
initSocket(server);

connectDatabase();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

const io = getSocket();

io.on('connection', (socket) => {
  console.log('New client connected: ' + socket.id);

  socket.on('registerUser', (userId: string) => {
    console.log('Joined: ' + userId)
    
    socket.join(userId);
  })

  socket.on('disconnect', (reason) => {
    console.log(`Client disconnected due to ${reason}`);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
