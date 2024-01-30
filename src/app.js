const express = require('express');
const cors = require('cors');
const postgres = require('postgres');
const router = require('./router');

const corsOptions = {
    // origin: ['http://localhost:3000'],
    origin: '*'
};

const app = express();

const { Pool } = require('pg');
require('dotenv').config();

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);

require('dotenv').config();

module.exports = app;