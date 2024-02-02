const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

require('dotenv').config();

const port = process.env.API_PORT || 4000;
const api = process.env.API_PATH || '/api/v1';

const token = require('./token/routes');

// Initialize app
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(morgan('dev', {
  skip(req, res) {
    return res.statusCode === 304;
  },
}));

// API Routes
app.use(`${api}/token`, token);

const server = app.listen(port, () => {
  console.debug(`server running on port ${port}`);
});

// Add a close function to the app, used for testing purposes
app.close = () => {
  console.debug(`closing the server on port ${port}`);
  server.close();
};

module.exports = app;
