import express from 'express';
import { UserController } from '../controllers/user.controller';
const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
)
userRouter.route('/loginAdmin').post(
    (req, res) => new UserController().loginAdmin(req, res)
)
userRouter.route('/getUser').post(
    (req, res) => new UserController().getUser(req, res)
)

userRouter.route('/register').post(
    (req, res) => new UserController().register(req, res)
)

userRouter.route('/isUsernameFree').post(
    (req, res) => new UserController().isUsernameFree(req, res)
)

userRouter.route('/isEmailFree').post(
    (req, res) => new UserController().isEmailFree(req, res)
)

export default userRouter;