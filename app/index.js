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
  skip(_, res) {
    return res.statusCode === 304;
  },
}));

// API Routes
app.use(`${api}/token`, token);

app.get('/signin', (req, res) => {
  console.log(process.env.yahoo_client_id);
  const yahooUrl = new URL('https://api.login.yahoo.com/oauth2/request_auth');

  yahooUrl.searchParams.append('client_id', `${process.env.yahoo_client_id}--`);
  yahooUrl.searchParams.append('response_type', 'code');
  yahooUrl.searchParams.append('redirect_uri', 'https://yahoo.com');
  yahooUrl.searchParams.append('scope', 'openid');
  yahooUrl.searchParams.append('nonce', 'YihsFwGKgt3KJUh6tPs2');

  const url = yahooUrl.toString();
  res.redirect(url);
});

app.use('/', (_, res) => { res.send('Welcome to BBall Insights API'); });

const server = app.listen(port, () => {
  console.debug(`server running on port ${port}`);
});

// Add a close function to the app, used for testing purposes
app.close = () => {
  console.debug(`closing the server on port ${port}`);
  server.close();
};

module.exports = app;
