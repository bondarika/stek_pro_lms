const jwt = require('jsonwebtoken');
const prisma = require('../prisma/prisma');

class TokenService {
  generateToken(payload) {
    const codeToken = jwt.sign(payload, process.env.JWT_CODE_SECRET, {
      expiresIn: '10m'
    });
    return {
      codeToken
    };
  }

  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '15s'
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d'
    });
    return {
      accessToken,
      refreshToken
    };
  }

  validateCodeToken(token) {
    try {
      const codeData = jwt.verify(token, process.env.JWT_CODE_SECRET);
      return codeData;
    } catch (e) {
      return null;
    }
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await prisma.token.findFirst({
      where: {
        userId: userId
      }
    });
    if (tokenData) {
      return await prisma.token.update({
        where: { userId: tokenData.userId },
        data: { refreshToken }
      });
    }
    const token = await prisma.token.create({ data: { userId, refreshToken } });
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await prisma.token.delete({
      where: { refreshToken: refreshToken }
    });
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await prisma.token.findUnique({
      where: { refreshToken: refreshToken }
    });
    return tokenData;
  }
}

module.exports = new TokenService();
