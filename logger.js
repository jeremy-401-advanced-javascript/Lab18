"use strict";

const io = require("socket.io-client");
const socket = io.connect("http://localhost:3000");

const logger = {};

logger.save = payload => {
  console.log("payload from logger ", payload);
  if (payload) {
    console.log("save ", payload);
  }
};

logger.err = payload => {
  if (payload) {
    console.log("err ", payload);
  }
};

socket.on("save", logger.save);
socket.on("err", logger.err);

module.export = logger;
