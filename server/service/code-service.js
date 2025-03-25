const prisma = require('../prisma/prisma');
const ApiError = require('../exceptions/api-error');
const tokenService = require('./token-service');
const CodeDto = require('../dtos/code-dto');

class CodeService {
  async validateCode(code) {
    const existingCode = await prisma.code.findUnique({ where: { code } });
    if (!existingCode) {
      throw ApiError.BadRequest(`
        такого кода не существует ☹️ 
        попробуйте ещё раз!`);
    }
    if (existingCode.usageLimit === existingCode.usedCount) {
      throw ApiError.BadRequest('введённый код был активирован ранее!');
    }
    const codeDto = new CodeDto(existingCode);
    const token = tokenService.generateToken({ ...codeDto });
    return { ...token, code: codeDto };
  }
}

module.exports = new CodeService();
