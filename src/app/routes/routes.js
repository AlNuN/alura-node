module.exports = (app) => {
  app.get('/', (req, resp) => {
    resp.send(`
      <!DOCTYPE html>
      <html lang="pt-br">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        <h1>Casa do Código<h1>
      </body>
      </html>
    `);
  });
  
  app.get('/livros', (req, resp) => {
    resp.send(`
      <!DOCTYPE html>
      <html lang="pt-br">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        <h1>Listagem de livros<h1>
      </body>
      </html>
    `);
  });
}
