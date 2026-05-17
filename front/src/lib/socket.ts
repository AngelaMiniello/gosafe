"use client";

import { io } from "socket.io-client";

export const socket = io("https://gosafe-am.onrender.com", {
    transports: ["websocket"],
});

socket.on("connect", () => {
    console.log("🟢 SOCKET OK:", socket.id);
});

socket.on("connect_error", (err) => {
    console.log("❌ SOCKET ERROR:", err.message);
});
