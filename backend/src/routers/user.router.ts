import express from 'express';
import { UserController } from '../controllers/user.controller';
const userRouter = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, 'uploads/profilePictures');
    },
    filename: (req: any, file: any, cb: any) => {
        let username = req.body.username;
        console.log(file.name)
        let randomString = Math.random().toString(36).substring(2, 15);
        cb(null, username + '_' + Date.now() + '_' + randomString+ '.' + file.mimetype.split('/')[1]);
    }
});

export var upload = multer({ storage: storage });

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

userRouter.route('/uploadProfilePicture').post(
    upload.single('file'), 
    (req, res) => new UserController().uploadProfilePicture(req, res)
)

export default userRouter;