"use strict";

const io = require('socket.io')(3000);

// let allowedEvents = ["save", "err"];

io.on('connection', socket => {
  console.log('Welcome', socket.id);

  socket.on('publish', payload => {
    try {
      if (typeof payload !== 'object') {
        payload = JSON.parse(payload);
        socket.broadcast.emit(payload.event, payload.data);
      }
    } catch (e) {
      console.log(e);
    }
  });
});
