const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
let requestsCount = 0


const FAVICON = path.join(__dirname, 'public', 'favicon.ico');

const server = http.createServer((req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (req.method === 'GET' && pathname !== '/favicon.ico') {
        requestsCount++
    }
    
    if (req.method === 'GET' && pathname === '/favicon.ico') {
        res.setHeader('Content-Type', 'image/x-icon');
        fs.createReadStream(FAVICON).pipe(res);
    }

    switch (req.url) {
        case '/students':
            res.write('STUDENTS')
            break;
        case '/':
        case  '/courses':
            res.write('BACK FRONT')
            break;
        default:
            res.write('404')
    }

    res.write('backend:  ' + requestsCount)
    res.end()
})

server.listen(3003)