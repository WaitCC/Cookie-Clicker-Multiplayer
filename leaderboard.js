var fs = require("fs");
var http = require("http");
const { parse } = require("querystring");

const port = 5750;
var leaderboard = {};

function parse64(data) {
        return Buffer.from(data).toString("base64");
}
function parseAscii(data) {
    return Buffer.from(data,"base64").toString("ascii");
}


const server = http.createServer((req,res) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    if (req.method=="GET") {
        data = parse(req.url.substring(2));
        console.log(data);
        if (data.apiAction=="post") {
            res.writeHead(200);
            res.end("ok");
            leaderboard[data.name]=data;
            console.log("leaderboard: "+JSON.stringify(leaderboard));
        } else if (data.apiAction=="get") {
            res.writeHead(200);
            res.end(JSON.stringify(leaderboard));
            console.log("sent leaderboard");
        } else {
            res.writeHead(400);
            res.end("invalid method");
        }
    } else {
        res.writeHead(400);
        res.end("bad request");
    }
}).listen(port);
