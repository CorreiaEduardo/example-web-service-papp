const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const authConfig = require('../../config/auth');

module.exports = {
  async validateUser(user) {
    const accountsWithSameEmail = await User.findAndCountAll({
      where: {
        email: user.email,
      },
    });
    if (accountsWithSameEmail.count > 0) {
      return false;
    }
    return true;
  },
  async generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
      expiresIn: 21600,
    });
  },
  async comparePassword(candidate, original) {
    return bcrypt.compare(candidate, original);
  },
};
