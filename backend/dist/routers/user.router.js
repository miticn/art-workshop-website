"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
const passport_1 = __importDefault(require("passport"));
const passport_middleware_1 = require("../passport.middleware");
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
userRouter.route('/login').post(passport_middleware_1.PassportMiddleware.checkNotAuthenticated, passport_1.default.authenticate('users-local'), (req, res) => { res.json({ success: true }); });
userRouter.route('/loginAdmin').post(passport_middleware_1.PassportMiddleware.checkNotAuthenticated, passport_1.default.authenticate('admin-local'), (req, res) => { res.json({ success: true }); });
userRouter.route('/logout').post(passport_middleware_1.PassportMiddleware.checkAuthenticated, (req, res) => { new user_controller_1.UserController().logout(req, res); });
userRouter.route('/getUser').post(passport_middleware_1.PassportMiddleware.checkAuthenticated, (req, res) => new user_controller_1.UserController().getUser(req, res));
userRouter.route('/getSessionUser').post((req, res) => new user_controller_1.UserController().getSessionUser(req, res));
userRouter.route('/register').post(exports.upload.single('file'), (req, res) => new user_controller_1.UserController().register(req, res));
userRouter.route('/changeUser').post(exports.upload.single('file'), (req, res) => new user_controller_1.UserController().changeUser(req, res));
userRouter.route('/isUsernameFree').post((req, res) => new user_controller_1.UserController().isUsernameFree(req, res));
userRouter.route('/isEmailFree').post((req, res) => new user_controller_1.UserController().isEmailFree(req, res));
userRouter.route('/uploadProfilePicture').post(exports.upload.single('file'), (req, res) => new user_controller_1.UserController().uploadProfilePicture(req, res));
userRouter.route('/isTokenValid').post((req, res) => new user_controller_1.UserController().isTokenValid(req, res));
userRouter.route('/setNewResetPassword').post((req, res) => new user_controller_1.UserController().setNewResetPassword(req, res));
userRouter.route('/getMyLikes').post((req, res) => new user_controller_1.UserController().getMyLikes(req, res));
userRouter.route('/resetPasswordRequest').post((req, res) => new user_controller_1.UserController().resetPasswordRequest(req, res));
userRouter.route('/changePassword').post(passport_middleware_1.PassportMiddleware.checkAuthenticated, (req, res) => new user_controller_1.UserController().changePassword(req, res));
userRouter.route('/getUserById').post(passport_middleware_1.PassportMiddleware.checkAuthenticated, (req, res) => new user_controller_1.UserController().getUserById(req, res));
userRouter.route('/getMyComments').post(passport_middleware_1.PassportMiddleware.checkAuthenticated, (req, res) => new user_controller_1.UserController().getMyComments(req, res));
userRouter.route('/becomeOrganizer').post(passport_middleware_1.PassportMiddleware.checkAuthenticated, (req, res) => new user_controller_1.UserController().becomeOrganizer(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map