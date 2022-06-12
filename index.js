require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const router = require("./src/routes");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL, // we must define cors because our client and server have diffe
  },
});

require("./src/socket")(io);
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.use("/api/v1/", router);
app.use("/public", express.static("public"));

server.listen(port, () => console.log(`Listening on port ${port}!`));
