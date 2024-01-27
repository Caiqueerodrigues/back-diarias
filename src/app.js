const express = require('express');
const cors = require('cors');
const router = require('./router');

const corsOptions = {
    origin: 'http://localhost:3000',
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);

module.exports = app;