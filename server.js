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

const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const port = process.env.PORT || 5000;
server.listen(port);

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

    io.on('connection', socket => {
      let chat = database.collection('chats');

      sendStatus = s => {
        socket.emit('status', s);
      };

      chat
        .find()
        .limit(100)
        .sort({ _id: 1 })
        .toArray((err, res) => {
          if (err) {
            throw err;
          }
          socket.emit('output', res);
        });

      socket.on('input', data => {
        let name = data.name;
        let message = data.message;

        chat.insert({ name: name, message: message }, () => {
          io.emit('output', [data]);
          sendStatus({
            message: 'Message sent'
          });
        });
      });
    });
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/requests', requests);
app.use('/api/job-items', jobItems);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('./public'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
