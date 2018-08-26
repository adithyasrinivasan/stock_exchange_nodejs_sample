"use strict";
const server_port = process.env.PORT || 8081;

var express = require("express");
var server = express();

server.listen(server_port, () => {
    console.log(`Starting Stock Exchange server on ${server_port}`);
});

server.get('/', (req, res) => {
    let result = {};
    result.status = false; //defaults to false. Explicitly set true when all conditions pass
    result.message = [];
    let query = req.query;

    //check for querystring size
    if (Object.keys(query).length <= 2){
       result.message.push(`http://localhost/countrycode=US&Category=Automobile&BaseBid=10`);
    }  else {

        //now check if the three parameters we require are specified
        if (!query.countrycode){
            result.message.push(`Countrycode is missing`);
        }

        if (!query.Category){
            result.message.push(`Category is missing`);
        }

        if (!query.BaseBid){
            result.message.push(`BaseBid is missing`);
        }

        if (result.message.length == 0){
            
        }

    }

    res.send(result);
});
