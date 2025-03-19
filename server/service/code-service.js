const prisma = require('../prisma/prisma');

class CodeService {
  async checkCode(code) {
    try {
      const existingCode = await prisma.code.findUnique({ where: { code } });
      return existingCode ? existingCode : null;
    } catch (e) {
      console.error(`Error checking code ${code}: ${e}`);
      throw new Error(`Error while checking code ${code} in the database`);
    }
  }
}

module.exports = new CodeService();
