const http = require('http');
const socketIo = require('socket.io');

const app = require('express')();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  const id = socket.handshake.query.id;

  socket.join(id);

  socket.on('send-message', ({ recipients, text }) => {
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient);
      newRecipients.push(id);
      io.to(recipient).emit('receive-message', {
        recipients: newRecipients,
        sender: id,
        text,
      });
    });
  });
});

const HOST = '0.0.0.0';
const PORT = process.env.PORT || 5000;

server.listen(PORT, HOST, () => {
  console.log(`Server listening on port ${PORT}`);
});
