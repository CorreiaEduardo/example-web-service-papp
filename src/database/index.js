const Sequelize = require('sequelize');

const User = require('../app/models/User');
const dbConfig = require('../config/database');

const connection = new Sequelize(dbConfig);

User.init(connection);

module.exports = connection;
