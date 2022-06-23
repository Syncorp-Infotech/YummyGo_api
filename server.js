const app = require("./app/app");
//var bodyParser = require("body-parser");

// set port, listen for requests
const PORT = process.env.PORT || 3030;
const http = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const { saveMsg, viewMsg } = require("./app/controllers/chat");
const { sendFCM } = require("./app/firebase");

// socket.io chat
// const http = require('http').createServer(app)
const io = require("socket.io")(http);
var users = [];
io.on("connection", (socket) => {
  //Get the chatID of the user and join in a room of the same name
  chatID = socket.handshake.query.chatID;
  socket.join(chatID);

  if (!users.includes(chatID)) {
    users.push(chatID);
  }
  console.log("chatID -------- ", chatID, users);

  // Log socket connection errors
  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  //Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    socket.leave(chatID);
    var indx = users.indexOf(chatID);
    delete users[indx];
  });

  //Send message to only a particular user
  socket.on("send_message", (message) => {
    console.log("Msg - ", message);
    receiverChatID = message.receiverChatID;
    senderChatID = message.senderChatID;
    content = message.content;

    // if (!users.includes(receiverChatID)) {
    //     sendFCM(message);
    // }
    sendFCM(message);
    saveMsg(message);

    //Send message to only that particular id
    socket.in(receiverChatID).emit(
      "receive_message",
      {
        content: content,
        senderChatID: senderChatID,
        receiverChatID: receiverChatID,
      },
      viewMsg(receiverChatID, senderChatID)
    );
  });
});
