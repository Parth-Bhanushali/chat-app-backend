import { Server } from "socket.io";
import { CustomSocketEvents } from "../types/custom";
import { Server as HttpServer } from "http";
import userPresence from "./handlers/userPresence";

let io: Server<CustomSocketEvents>;

export const initSocket = (httpServer: HttpServer) => {
  io = new Server<CustomSocketEvents>(httpServer);

  io.on("connection", (socket) => {
    // console.log(`Client connected: ${socket.id}`)
    
    // handle events
    userPresence(socket);

    socket.on("disconnect", (reason) => {
      // console.log(`Client disconnected due to ${reason}`);
    });
  });
};

export const getSocket = () => {
  if (!io) {
    throw new Error('Socket not initialized!');
  }
  return io;
};
