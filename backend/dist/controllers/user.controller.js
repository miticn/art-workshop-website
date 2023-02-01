"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const mailService_1 = __importDefault(require("../mailService"));
const user_1 = __importDefault(require("../models/user"));
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password, $or: [{ 'type': 'user' }, { 'type': 'org' }] }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.loginAdmin = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password, 'type': 'admin' }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getUser = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.isUsernameFree = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (err)
                    console.log(err);
                else {
                    if (user)
                        res.json({ free: false });
                    else
                        res.json({ free: true });
                }
            });
        };
        this.isEmailFree = (req, res) => {
            let email = req.body.email;
            user_1.default.findOne({ 'email': email }, (err, user) => {
                if (err)
                    console.log(err);
                else {
                    if (user)
                        res.json({ free: false });
                    else
                        res.json({ free: true });
                }
            });
        };
        this.register = (req, res) => {
            let user = new user_1.default({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                password: req.body.password,
                phone: req.body.phone,
                email: req.body.email,
                type: req.body.type
            });
            user.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else {
                    res.json({ "message": "ok" });
                    new mailService_1.default().sendRegisterEmail(user.email, user.firstname);
                }
            });
        };
        this.uploadProfilePicture = (req, res) => {
            let username = req.body.username;
            const file = req['file'];
            const filename = file.filename;
            console.log('Filename: ' + filename + '; Username: ' + username);
            if (!file) {
                const error = new Error("Please upload file");
                return res.status(400).send(error.message);
            }
            //userModel.collection.updateOne({ 'username': username }, { $set: { 'picture': file.filename } });
            //res.json({ ok: true });
            res.json({
                message: "File uploaded successfully",
                file: file.filename,
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map