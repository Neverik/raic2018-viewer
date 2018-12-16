const static = require('node-static');
const files = new static.Server("../", { cache: -1 });

var url = 'http://localhost:8080';
var start = (process.platform == 'darwin'? 'open': process.platform == 'win32'? 'start': 'xdg-open');
require('child_process').exec(start + ' ' + url);

const server = require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        files.serve(request, response);
    }).resume();
});

const io = require("socket.io")(server);

let client;

io.on("connection", c => {
    client = c;
    // example
    client.emit("transfer", [false, {}]);
    client.emit("transfer", [true, [{
        ball: {x: 20, y: 50, z: 30},
        teams: [
            {players: [
                {x: 10, y: 2, z: 2},
                {x: -20, y: 2, z: 17}]},
            {players: [
                {x: 17, y: 2, z: 50},
                {x: -30, y: 2, z: -50}]}]}]]);
});

server.listen(8080);
