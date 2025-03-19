const prisma = require('../prisma/prisma');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

class UserService {
  async registration(email, password, codeId) {
    const candidate = await prisma.user.findUnique({ where: { email } });
    if (candidate) {
      throw ApiError.BadRequest(`User with email ${email} already exists`);
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const activationLink = uuid.v4();
    const user = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
        activationLink,
        codeId: parseInt(codeId, 10)
      }
    });
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}api/activate/${activationLink}`
    );
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const user = await prisma.user.findUnique({ where: { activationLink } });
    if (!user) {
      throw ApiError.BadRequest('Incorrect activation link');
    }
    user.isActivated = true;
    await prisma.user.update({
      where: { id: user.id },
      data: { isActivated: true }
    });
  }
}

module.exports = new UserService();
