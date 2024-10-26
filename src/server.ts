import app from "./app";
import { initSocket } from "./sockets/socket";
import http from "http"; 
import dotenv from "dotenv";
dotenv.config();

const server = http.createServer(app);

initSocket(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
