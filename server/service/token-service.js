const jwt = require('jsonwebtoken');
const prisma = require('../prisma/prisma');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '15m'
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d'
    });
    return {
      accessToken,
      refreshToken
    };
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
}

module.exports = new TokenService();
