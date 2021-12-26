const ApiError = require("../errors/ApiError");
const { User, Basket } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJWT = (id, email, role) => {
  return jwt.sign({ id: id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async register(req, res, next) {
    try {
      const { email, password, role } = req.body;
      if (!email || !password) {
        return next(ApiError.badRequest("Некорректный email и пароль!"));
      }
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return next(ApiError.badRequest("Пользователь уже существует"));
      }
      const hashedPassword = await bcrypt.hash(password, 5);
      const user = await User.create({ email, role, password: hashedPassword });
      const basket = await Basket.create({ userId: user.id });

      const token = generateJWT(user.id, user.email, user.role);
      return res.json({ token });
    } catch (error) {
      console.log(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return next(ApiError.internalError("Пользователь не найден!"));
      }
      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return next(ApiError.internalError("Неверный пароль!"));
      }
      const token = generateJWT(user.id, user.email, user.role);
      return res.json({ token });
    } catch (error) {
      console.log(error);
    }
  }

  async check(req, res, next) {
    const token = generateJWT(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
}

module.exports = new UserController();
