"use strict";
const server_port = process.env.PORT || 8081;

const express = require("express");
const server = express();
const db = require("./db.js");

const logger = require("./winston.js");
const Stock = require("./stock.js");
let stock = new Stock(db);

server.listen(server_port, () => {
    logger.info(`Starting Stock Exchange server on ${server_port}`);

    logger.info(`Loading exchange data`);

    stock.loadData();

});

server.get('/', (req, res) => {

    let result = stock.handleGetRequest(req, res);

    res.send(result);
});