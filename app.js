"use strict";

const fs = require("fs");
const util = require("util");
const io = require("socket.io-client");
const socket = io.connect("http://localhost:3000");
require("./logger.js");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.readFile);

const file = {};

file.loadFile = file => readFile(file);
file.saveFile = (file, buffer) => writeFile(file, buffer);
file.convertBuffer = buffer => {
  Buffer.from(
    buffer
      .toString()
      .trim()
      .toUpperCase()
  );
};

file.alterFile = passFile => {
  console.log("file 27 :", passFile);
  return file
    .loadFile(passFile)
    .then(contents => file.convertBuffer(contents))
    .then(buffer => file.saveFile(passFile, buffer))
    .then(() => socket.emit("publish", { event: "save", data: passFile }))
    .then(() => true)
    .catch(error => socket.emit("publish", { event: "err", data: error }));
};

// const alterFile = file => {
//   fs.readFile(file, (err, data) => {
//     if (err) {
//       throw err;
//     }
//     let text = data.toString().toUpperCase();
//     fs.writeFile(file, Buffer.from(text), (err, data) => {
//       if (err) {
//         throw err;
//       }
//       console.log(`${file} saved`);
//     });
//   });
// };

let f = process.argv.slice(2).shift();
if (f) {
  file.alterFile(f);
}
module.exports = file;
