const socket = require("socket.io");
const { Chat } = require("../models/chat");


const initializeSocket = (server) => {

    const io = socket(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {

        socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
            const room = [userId, targetUserId].sort().join("_");

            socket.join(room);
        });

        socket.on("sendMessage", async ({ firstName, userId, targetUserId, text }) => {
            const room = [userId, targetUserId].sort().join("_");

            try {
                let chat = await Chat.findOne({
                    participants: { $all: [userId, targetUserId] }
                });

                if (!chat) {
                    chat = new Chat({
                        participants: [userId, targetUserId],
                        messages: [],
                    });
                }

                chat.messages.push({ senderId: userId, text });
                await chat.save();

            } catch (error) {
                console.error("Error in sendMessage:", error);
            }


            io.to(room).emit("messageReceived", { firstName, userId, text });
        });

        socket.on("disconnect", () => [

        ]);
    });
}

module.exports = initializeSocket;