const ApiError = require('../exceptions/api-error');
const tokenService = require('../service/token-service');

module.exports = async function (req, res, next) {
  try {
    const verificationHeader = req.headers.verification;
    console.log(verificationHeader);
    if (!verificationHeader) {
      return next(ApiError.UnauthorizedError());
    }
    const codeToken = verificationHeader.split(' ')[1];
     console.log(codeToken);
    if (!codeToken) {
      return next(ApiError.UnauthorizedError());
    }
    const codeData = tokenService.validateCodeToken(codeToken);
    if (!codeData) {
      return next(ApiError.UnauthorizedError());
    }
    req.codeId = codeData.id; 
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
