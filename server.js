const express = require('express');

const server = express();

server.all('/', (req, res)=>{
    res.send('Brave-MusicBot online.')
})


function keepAlive(){
    server.listen(3001, ()=>{console.log("Server online.")});
}

module.exports = keepAlive;
