const prisma = require('../prisma/prisma');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');

class UserService {
  async registration(email, password, codeId) {
    const candidate = await prisma.user.findUnique({ where: { email }});
    if (candidate) {
      throw new Error(`User with email ${email} already exists`);
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
    await mailService.sendActivationMail(email, activationLink);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {...tokens, user: userDto};
  }
}

module.exports = new UserService();
