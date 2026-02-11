// Connect to socket server
const socket = io();

// DOM elements
const messages = document.getElementById("messages");
const msgInput = document.getElementById("msg");

// Send message function
function sendMessage() {
  const msg = msgInput.value.trim();
  if (msg === "") return;

  // Send to server
  socket.emit("sendMessage", msg);

  // Show your own message
  const p = document.createElement("p");
  p.classList.add("you");
  p.innerText = msg;
  messages.appendChild(p);

  msgInput.value = "";
  messages.scrollTop = messages.scrollHeight;
}

// Receive message from other user
socket.on("receiveMessage", (msg) => {
  const p = document.createElement("p");
  p.classList.add("friend");
  p.innerText = msg;
  messages.appendChild(p);
  messages.scrollTop = messages.scrollHeight;
});

// Send message on Enter key
msgInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});
