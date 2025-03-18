const userService = require('../service/user-service');
const codeService = require('../service/code-service');

class UserController {

  async check(req, res) {
    try {
      const { code } = req.body;
      const result = await codeService.checkCode(code);
      return res.json(result);
    } catch (e) {
      console.log(e);
    }
  }

  async registration(req, res) {
    try {
      const { email, password, codeId } = req.body;
      const userData = await userService.registration(email, password, codeId);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
      return res.json(userData);
    } catch (e) {
      console.log(e);
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

  // async activate(req, res, next) {
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
