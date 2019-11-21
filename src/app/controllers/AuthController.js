const User = require('../models/User');
const AuthService = require('../services/AuthService');

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).send({ error: 'Usuário não cadastrado.' });
    }
    const isPasswordValid = await AuthService.comparePassword(
      password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(400).send({ error: 'Credenciais inválidas.' });
    }
    user.password = undefined;
    return res.json({
      user,
      token: await AuthService.generateToken({ id: user.id }),
    });
  },
  async register(req, res) {
    try {
      const isValid = await AuthService.validateUser(req.body);
      if (!isValid) {
        return res
          .status(400)
          .send({ error: 'Já existe um usuário cadastrado com esse e-mail.' });
      }
      const user = await User.create(req.body);
      user.password = undefined;
      return res.status(200).json({
        user,
        token: await AuthService.generateToken({ id: user.id }),
      });
    } catch (err) {
      return res.status(400).send({ error: 'Houve um erro no cadastro.' });
    }
  },
};
