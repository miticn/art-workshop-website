"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profilePictures');
    },
    filename: (req, file, cb) => {
        let randomString = Math.random().toString(36).substring(2, 15);
        cb(null, Date.now() + '_' + randomString + '.' + file.mimetype.split('/')[1]);
    }
});
exports.upload = multer({ storage: storage });
userRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route('/loginAdmin').post((req, res) => new user_controller_1.UserController().loginAdmin(req, res));
userRouter.route('/getUser').post((req, res) => new user_controller_1.UserController().getUser(req, res));
userRouter.route('/register').post((req, res) => new user_controller_1.UserController().register(req, res));
userRouter.route('/isUsernameFree').post((req, res) => new user_controller_1.UserController().isUsernameFree(req, res));
userRouter.route('/isEmailFree').post((req, res) => new user_controller_1.UserController().isEmailFree(req, res));
userRouter.route('/uploadProfilePicture').post(exports.upload.single('file'), (req, res) => new user_controller_1.UserController().uploadProfilePicture(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map