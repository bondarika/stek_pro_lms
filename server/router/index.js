const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();

router.post('/check', userController.check);
router.post('/registration', userController.registration);
// router.post('/login', userController.login);
// router.post('/logout', userController.logout);
// router.get('/activate/:link', userController.activate);
// router.get('/refresh', userController.refresh);
// router.get('/users', userController.getUsers);
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
