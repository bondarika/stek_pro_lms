const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth-middleware');

router.post('/check', userController.check);
router.post(
  '/registration',
  [
    body('email').isEmail(),
    body('password')
      .isLength({ min: 8, max: 32 })
      .matches(/^[A-Za-z0-9#?!@$%^&*-.]+$/)
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
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
// router.get('/users/:id', userController.getUser);
/*
router.get("/users/:id");
router.put("/users/:id");
router.delete("/users/:id");

router.post("/codes");
router.get("/codes");
router.get("/codes/:id");
router.get("/codes/check/:code");
router.post(" /codes/use");
router.delete("/codes/:id");

router.post(" /users/:userId/codes/:codeId");
router.get(" /users/:userId/codes");
router.delete(" /users/:userId/codes/:codeId");

router.get("/tokens");
router.get("/tokens/:id");
*/
module.exports = router;
