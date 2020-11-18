const app = require('./src/config/custom-express');

const port = 3000;
const hostname = 'localhost';

app.listen(port, hostname,  () => {
  console.log(`Server running on http://${hostname}:${port}`)
});
