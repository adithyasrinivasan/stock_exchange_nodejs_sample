"use strict";
const server_port = process.env.PORT || 8081;

const express = require("express");
const server = express();
const db = require("./db.js");

const Stock = require("./stock.js");
let stock = new Stock(db);

server.listen(server_port, () => {
    console.log(`Starting Stock Exchange server on ${server_port}`);

    console.log(`Loading exchange data`);

    stock.loadData();

});

server.get('/', (req, res) => {

    let result = stock.handleGetRequest(req, res);

    res.send(result);
});