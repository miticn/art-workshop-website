import express from 'express';
import { UserController } from '../controllers/user.controller';
const userRouter = express.Router();
import passport from 'passport';
import { PassportMiddleware } from '../passport.middleware';

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, 'uploads/profilePictures');
    },
    filename: (req: any, file: any, cb: any) => {
        let randomString = Math.random().toString(36).substring(2, 15);
        cb(null, Date.now() + '_' + randomString+ '.' + file.mimetype.split('/')[1]);
    }
});

export var upload = multer({ storage: storage });

userRouter.route('/login').post(
    PassportMiddleware.checkNotAuthenticated,
    passport.authenticate('users-local'),(req, res)=>{res.json({success: true})}
)

userRouter.route('/loginAdmin').post(
    PassportMiddleware.checkNotAuthenticated,
    passport.authenticate('admin-local'),(req, res)=>{res.json({success: true})}
)

userRouter.route('/logout').post(
    PassportMiddleware.checkAuthenticated,
    (req, res) => {new UserController().logout(req, res)}
)

userRouter.route('/getUser').post(
    PassportMiddleware.checkAuthenticated,
    (req, res) => new UserController().getUser(req, res)
)

userRouter.route('/getSessionUser').post(
    (req, res) => new UserController().getSessionUser(req, res)
)

userRouter.route('/register').post(
    upload.single('file'), 
    (req, res) => new UserController().register(req, res)
)

userRouter.route('/changeUser').post(
    upload.single('file'), 
    (req, res) => new UserController().changeUser(req, res)
)

userRouter.route('/isUsernameFree').post(
    (req, res) => new UserController().isUsernameFree(req, res)
)

userRouter.route('/isEmailFree').post(
    (req, res) => new UserController().isEmailFree(req, res)
)

userRouter.route('/uploadProfilePicture').post(
    upload.single('file'), 
    (req, res) => new UserController().uploadProfilePicture(req, res)
)

userRouter.route('/isTokenValid').post(
    (req, res) => new UserController().isTokenValid(req, res)
)

userRouter.route('/setNewResetPassword').post(
    (req, res) => new UserController().setNewResetPassword(req, res)
)

userRouter.route('/resetPasswordRequest').post(
    (req, res) => new UserController().resetPasswordRequest(req, res)
)

userRouter.route('/changePassword').post(
    PassportMiddleware.checkAuthenticated,
    (req, res) => new UserController().changePassword(req, res)
)

export default userRouter;