const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth-middleware');
const codeMiddleware = require('../middleware/code-middleware');

router.post('/validate', userController.validate);
router.post(
  '/registration',
  codeMiddleware,
  [
    body('email').isEmail(),
    body('password')
      .isLength({ min: 8, max: 32 })
      // .matches(/^[A-Za-z0-9#?!@$%^&*-.]+$/)
      .matches(/^[A-Za-z0-9]+$/)
      .withMessage(
        'Пароль должен содержать только буквы латинского алфавита, цифры и специальные символы'
      )
      .matches(/^(?=.*?[A-Z])/)
      .withMessage('Пароль должен содержать хотя бы одну заглавную букву')
      .matches(/^(?=.*?[a-z])/)
      .withMessage('Пароль должен содержать хотя бы одну строчную букву')
      .matches(/^(?=.*?[0-9])/)
      .withMessage('Пароль должен содержать хотя бы одну строчную цифру')
      .matches(/^(?=.*?[#?!@$%^&*_\-+=.])/)
      .withMessage(
        'Пароль должен содержать хотя бы один специальный символ (#?!@$%^&*_-+='
      )
  ],
  userController.registration
);
router.get('/activate/:link', userController.activate);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post("/forgot-password", userController.forgotPassword);
router.post('/reset-password/:resetLink', userController.resetPassword);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/user/courses', authMiddleware, userController.getCourses);

// Для отслеживания прогресса get
router.get(
  '/user/progress/:courseId',
  authMiddleware,
  userController.getCurrentProgress
);
// Для отслеживания прогресса post
router.post(
  '/user/progress',
  authMiddleware,
  userController.trackCurrentProgress
);

// Для отслеживания текущего шага
// ?????????????????????????????????

module.exports = router;
