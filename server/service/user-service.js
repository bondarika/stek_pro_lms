const prisma = require('../prisma/prisma');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

class UserService {
  async registration(name, surname, email, password, codeId) {
    const candidate = await prisma.user.findUnique({ where: { email } });
    if (candidate) {
      throw ApiError.BadRequest(
        `пользователь уже существует`
      );
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const activationLink = uuid.v4();
    const user = await prisma.user.create({
      data: {
        name,
        surname,
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
    await prisma.code.update({
      where: { id: codeId },
      data: { usedCount: { increment: 1 } }
    });
    await prisma.userCodes.create({
      data: {
        userId: user.id,
        codeId: codeId
      }
    });
    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const user = await prisma.user.findUnique({ where: { activationLink } });
    if (!user) {
      throw ApiError.BadRequest('некорректная ссылка активации');
    }
    user.isActivated = true;
    await prisma.user.update({
      where: { id: user.id },
      data: { isActivated: true }
    });
  }

  async login(email, password) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw ApiError.BadRequest(`неверная электронная почта`);
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('неверный пароль');
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await prisma.user.findUnique({ where: { id: userData.id } });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = await prisma.user.findMany();
    return users;
  }

async getUserCourses(userId) {
  const userCodes = await prisma.userCodes.findMany({
    where: { userId },
    include: {
      code: true
    }
  });

  const isAdmin = userCodes.some((userCode) => userCode.code.type === 'admin');

  if (isAdmin) {
    const courses = await prisma.course.findMany();
    return courses;
  }

  const codeTypes = userCodes.map((userCode) => userCode.code.type);

  const courses = await prisma.course.findMany({
    where: {
      type: { in: codeTypes }
    }
  });

  return courses;
}

//сейчас
async getCurrentUserProgress(userId, courseId) {
  const progress = await prisma.userCourseProgress.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId
      }
    }
  });

  if (!progress) {
    // начальное состояние — первые шаги
    return {
      userId,
      courseId,
      module: 1,
      lesson: 1,
      section: 'теория',
      step: 1,
      updatedAt: null
    };
  }

  return progress;
}


async trackCurrentUserProgress(        
        userId,
        courseId,
        module,
        lesson,
        section,
        step) 
        {
        const result = await prisma.userCourseProgress.upsert({
        where: {
          userId_courseId: {
            userId,
            courseId
          }
        },
        update: {
          module,
          lesson,
          section,
          step
        },
        create: {
          userId,
          courseId,
          module,
          lesson,
          section,
          step
        }
      });
      return result;
}
}

module.exports = new UserService();
