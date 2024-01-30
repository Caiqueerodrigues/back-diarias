require('dotenv').config();
const app = require('./app');

const port = process.env.port || 3003;

app.listen(port, () => {
    console.log('rodando backend');
});