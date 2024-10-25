import { Server } from "socket.io";
import { CustomSocketEvents } from "../types/custom";

let io: Server<CustomSocketEvents>;

export const initSocket = (httpServer: any) => {
  io = new Server<CustomSocketEvents>(httpServer);
};

export const getSocket = () => {
  if (!io) {
    throw new Error('Socket not initialized!');
  }
  return io;
};
