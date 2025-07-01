import { User } from "./models/user.js";
import { Message } from "./models/message.js";
const sockethandler = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("user-online", async ({ userId }) => {
      try {
        await User.findByIdAndUpdate(userId, { isOnline: true });
        const user = await User.findById(userId);
        io.emit("update-status", {
          userId,
          isOnline: true,
          lastSeen: user.lastSeen,
        });
      } catch (error) {
        console.error("Error updating online status:", error);
      }
    });

    // Handle typing status
    socket.on("typing", ({ sender, receiver }) => {
      io.to(receiver).emit("typing", { sender });
    });

    // Handle new message
    socket.on("send-message", ({ sender, receiver, content }) => {
      io.to(receiver).emit("receive-message", { sender, content });
    });
    socket.on("typing", ({ senderId, receiverId }) => {
      io.to(receiverId).emit("typing", { senderId });
    });

    socket.on("send-message", async ({ senderId, receiverId, content }) => {
      try {
        // Save the message to the database
        const message = await Message.create({
          sender: senderId,
          receiver: receiverId,
          content,
        });

        
        io.to(receiverId).emit("receive-message", {
          senderId,
          receiverId,
          content,
          timestamp: message.timestamp,
        });
      } catch (error) {
        console.error("Error saving or broadcasting message:", error);
      }
    });

    socket.on("stop-typing", ({ senderId, receiverId }) => {
      io.to(receiverId).emit("stop-typing", { senderId });
    });
    // Handle disconnect
    socket.on("disconnect", async () => {
      try {
        const user = await User.findOneAndUpdate(
          { socketId: socket.id },
          { isOnline: false, lastSeen: new Date() },
          { new: true }
        );
        if (user) {
          io.emit("update-status", {
            userId: user._id,
            isOnline: false,
            lastSeen: user.lastSeen,
          });
        }
        console.log("User disconnected:", socket.id);
      } catch (error) {
        console.error("Error updating disconnect status:", error);
      }
    });
  });
};
export default sockethandler;
