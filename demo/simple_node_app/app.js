const http = require('http');
const fs = require('fs');
const dir = './public/';
const PORT = process.env.PORT|3000;
const path = require('path')

const server = http.createServer((req,res)=>{
    if(req.url ==='/'){
        render(res,'index.html');
    }else if(req.url ==='/about'){
        render(res,'about.html')
    }else if(req.url==='/contact'){
        render(res,'contact.html')
    }else{
        res.writeHead(404,{'Content-type':'text/html'});
        res.end('<h1>404 File Not Found</h1>')
    }
});

server.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})

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