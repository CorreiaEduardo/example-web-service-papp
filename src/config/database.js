require('dotenv').config();

const config = {
  dialect: process.env.DB_DIALECT,
  url: process.env.DB_URL,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
  },
  logging: false,
};
module.exports = config;
