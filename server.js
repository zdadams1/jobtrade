const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const http = require('http');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const requests = require('./routes/api/requests');
const jobItems = require('./routes/api/jobitems');
const chat = require('./routes/api/chat');
const item = require('./routes/api/item');

const socketio = require('socket.io');
const formatMessage = require('./config/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require('./config/users');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true }, (err, database) => {
    if (err) {
      throw err;
    }
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/requests', requests);
app.use('/api/job-items', jobItems);
app.use('/api/chat', chat);
app.use('/api/item', item);

const botName = 'JobTrade Bot';

io.on('connection', (socket) => {
  socket.on('joinRoom', ({ handle, room }) => {
    const user = userJoin(socket.id, handle, room);

    socket.join(user.room);

    socket.emit('message', formatMessage(botName, 'Welcome to JobTrade!'));

    socket.broadcast
      .to(user.room)
      .emit('message', formatMessage(botName, `${user.handle} joined.`));

    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  socket.on('chatMessage', (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit('message', formatMessage(user.handle, msg));
  });

  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.handle} left chat.`)
      );

      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('./public'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const port = process.env.PORT || 5000;

server.listen(port);
