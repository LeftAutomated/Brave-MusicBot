const express = require('express');

const server = express();

server.all('/', (req, res)=>{
    res.send('CoCo-Beats online.')
})


function keepAlive(){
    server.listen(3001, ()=>{console.log("Server online.")});
}

module.exports = keepAlive;
