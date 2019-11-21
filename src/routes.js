const express = require('express');
const AuthController = require('./app/controllers/AuthController');

const routes = express.Router();

routes.get('/ping', (_, res) => {
  res.json({ ping: 'pong!' });
});

routes.post('/login', AuthController.login);
routes.post('/register', AuthController.register);

module.exports = routes;
