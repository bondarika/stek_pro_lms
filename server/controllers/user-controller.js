const userService = require('../service/user-service');
const codeService = require('../service/code-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');

class UserController {
  async validate(req, res, next) {
    try {
      const { code } = req.body;
      const codeData = await codeService.validateCode(code);
      return res.json(codeData);
    } catch (e) {
      next(e);
    }
  }

  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest(
            `
          слабый пароль! 
          придумайте понадежнее`,
            errors.array()
          )
        );
      }
      const { name, surname, email, password } = req.body;
      const codeId = req.codeId;
      const userData = await userService.registration(
        name,
        surname,
        email,
        password,
        codeId
      );
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      });
      return (
        res.json(userData), res.redirect(`${process.env.CLIENT_URL}/courses`)
      );
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(`${process.env.CLIENT_URL}/courses`);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      });
      return (
        res.json(userData), res.redirect(`${process.env.CLIENT_URL}/courses`)
      );
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

//ЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬ
  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      const resetToken = await userService.forgotPassword(email);
      res.cookie('resetToken', resetToken, {
        maxAge: 1 * 60 * 60 * 1000,
        httpOnly: true
      });
       return res.json(resetToken);
    } catch (e) {
      next(e);
    }
  }
//ЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬ
  async resetPassword(req, res, next) {
    try {
      const { resetToken } = req.cookies;
      const { email, newPassword } = req.body;
      await userService.resetPassword(resetToken, email, newPassword);
    } catch (e) {
      next(e);
    }
  }
//ЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬЗДЕСЬ

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async getCourses(req, res, next) {
    try {
      const userId = req.user.id;
      const courses = await userService.getUserCourses(userId);
      return res.json(courses);
    } catch (e) {
      next(e);
    }
  }

  //сейчас
  async getCurrentProgress(req, res, next) {
    try {
      const userId = req.user.id;
      const courseId = parseInt(req.params.courseId, 10);

      const progress = await userService.getCurrentUserProgress(
        userId,
        courseId
      );
      return res.json(progress);
    } catch (e) {
      next(e);
    }
  }

  async trackCurrentProgress(req, res, next) {
    try {
      const userId = req.user.id;
      const { courseId, module, lesson, section, step } = req.body;
      const result = await userService.trackCurrentUserProgress(
        userId,
        courseId,
        module,
        lesson,
        section,
        step
      );
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();