//This file will send requests to the server
const http = require('http');
const data = JSON.stringify({
    title:'MEAN STACK'
});

const options = {
    hostname: 'localhost',
    port:3000,
    path:'/',
    method: 'GET',
    headers:{
        'Content-Type':'application/json',
        'Content-Length':data.length
    }
}

const request = http.request(options,response=>{
    response.on('data',chunk=>{
        process.stdout.write(chunk);
    })
})

request.on('error',error=>{
    console.error(error);
})

request.end();

