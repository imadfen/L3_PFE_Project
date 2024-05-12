import { io } from "socket.io-client";

const socket = io('/', {
    path: '/socket.io/',
    withCredentials: true,
});

export default socket;
