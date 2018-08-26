"use strict";
const server_port = process.env.PORT || 8081;

var express = require("express");
var server = express();

server.listen(server_port, () => {
    console.log(`Starting Stock Exchange server on ${server_port}`);
});

server.get('/', (req, res) => {
    res.send('Hello World!');
});
