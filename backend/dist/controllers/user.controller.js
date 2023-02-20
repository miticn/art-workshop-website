"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const mailService_1 = __importDefault(require("../mailService"));
const user_1 = __importDefault(require("../models/user"));
const token_1 = __importDefault(require("../models/token"));
const user_2 = __importDefault(require("../models/user"));
const likes_1 = __importDefault(require("../models/likes"));
const comments_1 = __importDefault(require("../models/comments"));
class UserController {
    constructor() {
        this.getUserById = (req, res) => {
            let id = req.body.id;
            user_2.default.findById(id, (err, user) => {
                if (err)
                    console.log(err);
                else if (user)
                    res.json({
                        _id: user._id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        username: user.username,
                        phone: user.phone,
                        email: user.email,
                        type: user.type,
                        profilePicture: user.profilePicture,
                        verified: user.verified,
                        org: user.org
                    });
                else
                    res.json({ error: "no user" });
            });
        };
        this.getSessionUser = (req, res) => {
            if (req.isAuthenticated()) {
                let user = req.user;
                if (user)
                    res.json({
                        _id: user._id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        username: user.username,
                        phone: user.phone,
                        email: user.email,
                        type: user.type,
                        profilePicture: user.profilePicture,
                        verified: user.verified,
                        org: user.org
                    });
                else
                    res.json({ error: "no user" });
            }
            else
                res.json({ error: "not authenticated" });
        };
        this.getUser = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (err)
                    console.log(err);
                else if (user)
                    res.json({
                        _id: user._id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        username: user.username,
                        phone: user.phone,
                        email: user.email,
                        type: user.type,
                        profilePicture: user.profilePicture,
                        verified: user.verified,
                        org: user.org
                    });
                else
                    res.json({ error: "no user" });
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
            let sendingUser = req.user;
            let isAdmin = sendingUser != undefined && sendingUser.type == "admin";
            let user = new user_1.default({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                password: req.body.password,
                phone: req.body.phone,
                email: req.body.email,
                type: req.body.type,
                profilePicture: "default.png",
                org: JSON.parse(req.body.org),
                verified: isAdmin ? "approved" : "waiting",
            });
            user.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else {
                    if (req['file'])
                        this.uploadProfilePicture(req, res);
                    else {
                        res.json({ "message": "ok" });
                    }
                    console.log("User registered: " + user.username);
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
            user_1.default.updateOne({ 'username': username }, { $set: { 'profilePicture': file.filename } }, (err, resp) => {
                if (err)
                    res.json({ error: err });
                else {
                    res.json({ message: "ok" });
                }
            });
        };
        this.isTokenValid = (req, res) => {
            let token = req.body.token;
            token_1.default.findOne({ 'token': token }, (err, token) => {
                if (err)
                    console.log(err);
                else {
                    if (token) {
                        if (token.expiry > Date.now())
                            res.json({ valid: true });
                        else {
                            res.json({ valid: false });
                            token.remove();
                        }
                    }
                    else
                        res.json({ valid: false });
                }
            });
        };
        this.setNewResetPassword = (req, res) => {
            let token = req.body.token;
            let password = req.body.password;
            token_1.default.findOne({ 'token': token }, (err, token) => {
                console.log('found: ' + token);
                if (err)
                    console.log(err);
                else {
                    if (token) {
                        if (token.expiry > Date.now()) {
                            user_1.default.findById(token.user_id, (error, user) => {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    user.password = password;
                                    user.save((err, resp) => {
                                        if (err) {
                                            console.log(err);
                                            res.status(400).json({ "message": "error" });
                                        }
                                        else {
                                            token.remove();
                                            res.json({ "message": "ok" });
                                        }
                                    });
                                }
                            });
                        }
                        else {
                            console.log("Token expired " + token.expiry + " " + Date.now() + " " + token.token);
                            token.remove();
                        }
                    }
                    else
                        console.log("Token not found " + token.token);
                }
            });
        };
        this.resetPasswordRequest = (req, res) => {
            console.log("Entered resetPasswordRequest");
            let email = req.body.email;
            user_1.default.findOne({ 'email': email }, (err, user) => {
                if (err)
                    console.log(err);
                else {
                    if (user) {
                        let token = new token_1.default({
                            user_id: user._id,
                            token: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                            expiry: Date.now() + 1800000
                        });
                        token.save((err, resp) => {
                            if (err) {
                                console.log(err);
                                res.status(400).json({ "message": "error" });
                            }
                            else {
                                res.json({ "message": "ok" });
                                new mailService_1.default().sendResetPasswordEmail(email, user.firstname, token.token);
                            }
                        });
                    }
                    else
                        res.status(400).json({ "message": "No user found" });
                }
            });
        };
        this.logout = (req, res) => {
            console.log(req.user.username + " logged out");
            req.logout(function (err) {
                res.json({ "message": "ok" });
            });
        };
        this.changeUser = (req, res) => {
            let usernamechange = req.body.usernamechange;
            user_1.default.findOneAndUpdate({ 'username': usernamechange }, {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                phone: req.body.phone,
                email: req.body.email,
                org: JSON.parse(req.body.org)
            }).exec((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else {
                    if (req['file'])
                        this.uploadProfilePicture(req, res);
                    else {
                        res.json({ "message": "ok" });
                    }
                    console.log("User changed profile: " + req.body.username);
                }
            });
        };
        this.changePassword = (req, res) => {
            let user = req.user;
            let oldPassword = req.body.oldPassword;
            let newPassword = req.body.newPassword;
            if (user.password == oldPassword) {
                user.password = newPassword;
                user.save((err, resp) => {
                    if (err) {
                        console.log(err);
                        res.json({ "message": "error" });
                    }
                    else {
                        res.json({ "message": "ok" });
                        console.log("User changed password: " + user.username);
                    }
                });
            }
            else {
                res.json({ "message": "error" });
            }
        };
        this.getMyLikes = (req, res) => {
            let user = req.user;
            likes_1.default.find({ 'user': user._id }, (err, likes) => {
                if (err)
                    console.log(err);
                else {
                    res.json(likes);
                }
            });
        };
        this.getMyComments = (req, res) => {
            let user = req.user;
            comments_1.default.find({ 'user': user._id }, (err, comments) => {
                if (err)
                    console.log(err);
                else {
                    res.json(comments);
                }
            });
        };
        this.becomeOrganizer = (req, res) => {
            let user = req.user;
            let org = req.body.org;
            user.org = org;
            user.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.json({ "message": "error" });
                }
                else {
                    res.json({ "message": "ok" });
                    console.log("User sent request to become organizer: " + user.username);
                }
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map