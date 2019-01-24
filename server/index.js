var path = require("path");
var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var port = process.env.PORT || process.env["app_port"] || 7007;

app.use(express.static(path.resolve(`${__dirname}/../client`)));

// serve host css/js - create nice short URLs
app.get("/js", (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../client/assets/js/host.js`));
});
app.get("/css", (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../client/assets/css/host.css`));
});

// serve device client
app.get("/:talk?", (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../client/pages/device.html`));
});

// maintain record of all active talks
const activeTalks = {};

// default emoji set if no custom set supplied
const defaultEmojis = ["😀", "☹️", "🤣", "😴", "👍", "👎", "🖕", "🤞"];

// sockets
var hostSocket = io.of("/host");
var deviceSocket = io.of("/device");

hostSocket.on("connection", socket => {
  socket.on("init", data => {
    const { talk } = data;
    if (activeTalks[talk]) {
      socket.emit("error", "Talk ID already exists");
    } else {
      socket.talk = talk;

      // save host in object along with their emoji, limit emoji length
      const emoji = data.emoji ? [...data.emoji].slice(0, 10) : defaultEmojis;
      activeTalks[talk] = emoji;

      socket.emit("emoji", activeTalks[talk]);
    }
  });

  // on host disconnect, remove it from list
  socket.on("disconnect", () => {
    delete activeTalks[socket.talk];
  });
});

deviceSocket.on("connection", socket => {
  socket.on("requestEmoji", data => {
    if (data.talk && activeTalks[data.talk]) {
      socket.emit("emoji", activeTalks[data.talk]);
    } else {
      socket.emit("no-emoji", {});
    }
  });
  socket.on("on", data => {
    hostSocket.emit("on", data);
  });
  socket.on("off", data => {
    hostSocket.emit("off", data);
  });
});

http.listen(port);
