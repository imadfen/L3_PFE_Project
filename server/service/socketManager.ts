import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';

let io: IOServer | null = null;

export const initSocket = (server: HttpServer) => {
    io = new IOServer(server, {
        path: '/socket.io/',
        cors: {
            origin: process.env.CLIENT_URL,
            methods: ["GET", "POST"],
        }
    });
    return io;
};

export const getIO = (): IOServer => {
    if (!io) {
        throw new Error('Socket.io not initialized!');
    }
    return io;
};
