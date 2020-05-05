var fs = require("fs");
var http = require("http");
const { parse } = require("querystring");

const port = 5750;
var leaderboard = {}
inactiveTimeout = 24*3600 // 1 day

const server = http.createServer((req,res) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    if (req.method=="GET") {
        data = parse(req.url.substring(2));
        if (data.apiAction=="post") {
            res.writeHead(200);
            res.end("ok");
            data.lastUpdate = Math.floor(Date.now() / 1000);
            leaderboard[data.name]=data;
        } else if (data.apiAction=="get") {
            res.writeHead(200);
            res.end(JSON.stringify(leaderboard));
        } else {
            res.writeHead(400);
            res.end("invalid method");
        }
    } else {
        res.writeHead(400);
        res.end("bad request");
    }
}).listen(port);
console.log("Started on port "+port);

setInterval(function() {
    currentTime = Math.floor(Date.now() / 1000);
    for (x in leaderboard) {
        if (leaderboard[x].lastUpdate+inactiveTimeout<currentTime) {
            console.log("Removed "+x+" from leaderboard for inactivity");
            delete leaderboard[x];
        }
    }
},inactiveTimeout*1000);
