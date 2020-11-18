const http = require('http');

const server = http.createServer((req, resp) => {
  resp.end(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <h1>Casa do Código</h1>
    </body>
    </html>
  `);
});

server.listen(3000);