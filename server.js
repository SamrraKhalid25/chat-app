const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const os = require("os"); // IP detect ke liye

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from public folder
app.use(express.static("public"));

// Socket.io connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Receive message object {name, msg} and broadcast to others
  socket.on("sendMessage", (data) => {
    // Broadcast to all except sender
    socket.broadcast.emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Get local IPv4 address automatically
function getLocalIP() {
  const ifaces = os.networkInterfaces();
  for (let dev in ifaces) {
    for (let details of ifaces[dev]) {
      if (details.family === "IPv4" && !details.internal) {
        return details.address;
      }
    }
  }
  return "localhost";
}

const PORT = 3000;
const HOST = "0.0.0.0"; // allows all devices in the same network

server.listen(PORT, HOST, () => {
  console.log(`Server running on http://${getLocalIP()}:${PORT}`);
});
