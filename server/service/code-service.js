const prisma = require('../prisma/prisma');
const ApiError = require('../exceptions/api-error');
const tokenService = require('./token-service');
const CodeDto = require('../dtos/code-dto');

class CodeService {
  async validateCode(code) {
    const existingCode = await prisma.code.findUnique({ where: { code } });
    if (!existingCode) {
      throw ApiError.BadRequest('Такого кода не существует');
    }
    if (existingCode.usageLimit === existingCode.usedCount) {
      throw ApiError.BadRequest('Код уже использован');
    }
    const codeDto = new CodeDto(existingCode);
    const token = tokenService.generateToken({ ...codeDto });
    return { ...token, code: codeDto };
  }
}

module.exports = new CodeService();
