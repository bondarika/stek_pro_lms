const prisma = require('../prisma/prisma');

class CodeService {
  async checkCode(code) {
    try {
      const existingCode = await prisma.code.findUnique({ where: { code } });
      return existingCode ? existingCode : null;
    } catch (e) {
      console.error(`Произошла ошибка во время проверки кода ${code}: ${e}`);
      throw new Error(
        `Произошла ошибка во время проверки кода ${code} в базе данных`
      );
    }
  }
}

module.exports = new CodeService();
