// Connect to socket server
const socket = io();

// User se naam pooch lo
let username = prompt("Enter your name:") || "Anonymous";

// DOM elements
const form = document.getElementById("chat-form");
const input = document.getElementById("message"); // input box
const messages = document.getElementById("messages"); // message list

// Send message function
function sendMessage() {
  const msg = input.value.trim();
  if (!msg) return;

  // Send to server with username
  socket.emit("sendMessage", { name: username, msg });

  // Show your own message
  const li = document.createElement("li");
  li.classList.add("you");
  li.innerHTML = `<strong>${username}:</strong> ${msg}`;
  messages.appendChild(li);

  // Clear input and auto-scroll
  input.value = "";
  messages.scrollTop = messages.scrollHeight;
}

// Receive message from other user
socket.on("receiveMessage", (data) => {
  const li = document.createElement("li");
  li.classList.add("friend");
  li.innerHTML = `<strong>${data.name}:</strong> ${data.msg}`;
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
});

// Send message on Enter key
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// Optional: focus input on load
input.focus();
