const express = require('express');
const fs = require('fs');
const dir = './public/';
const PORT = process.env.PORT|3000;
const path = require('path');

const app = express();

app.get('/',(req,res)=>{
    render(res,'index.html');
});

app.get('/about',(req,res)=>{
    render(res,'about.html')
});

app.get('/contact',(req,res)=>{
    render(res,'contact.html')
});

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
});

const render = (res,file)=>{
    fs.readFile(path.join(dir,file),(err,data)=>{
        if(err){
            res.writeHead(400,{'Content-type':'text/html'});
            res.end('<h1>404 File Not Found</h1>')
        }
        res.writeHead(200,{'Content-type':'text/html'});
        return res.end(data);
    });
}



 