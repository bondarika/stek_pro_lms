const userService = require('../service/user-service');
const codeService = require('../service/code-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');

class UserController {
  async check(req, res, next) {
    try {
      const { code } = req.body;
      const result = await codeService.checkCode(code);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка валидации', errors.array()));
      }
      const { email, password, codeId } = req.body;
      const userData = await userService.registration(email, password, codeId);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  // async login(req, res, next) {
  //   try {
  //   } catch (e) {}
  // }

  // async logout(req, res, next) {
  //   try {
  //   } catch (e) {}
  // }

  // async refresh(req, res, next) {
  //   try {
  //   } catch (e) {}
  // }

  // async getUsers(req, res, next) {
  //   try {
  //     res.status(400).json(['123', '456']);
  //   } catch (e) {}
  // }
}

module.exports = new UserController();
