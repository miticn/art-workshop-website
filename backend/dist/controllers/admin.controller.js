"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const user_1 = __importDefault(require("../models/user"));
const mailService_1 = __importDefault(require("../mailService"));
const workshop_1 = __importDefault(require("../models/workshop"));
class AdminController {
    constructor() {
        this.approveUser = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ username: username }, (err, user) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                if (!user) {
                    res.status(404).send({ message: "User Not found." });
                    return;
                }
                user.verified = "approved";
                user.save((err) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    new mailService_1.default().sendVerifiedAccountEmail(user.email, user.name, user.username);
                    res.send({ message: "User was approved successfully!" });
                });
            });
        };
        this.rejectUser = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ username: username }, (err, user) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                if (!user) {
                    res.status(404).send({ message: "User Not found." });
                    return;
                }
                user.verified = "rejected";
                user.save((err) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    new mailService_1.default().sendRejectedAccountEmail(user.email, user.name, user.username);
                    res.send({ message: "User was rejected successfully!" });
                });
            });
        };
        this.getWaitingUsers = (req, res) => {
            user_1.default.find({ verified: "waiting" }).select("-password").exec((err, users) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                res.send(users);
            });
        };
        this.getAllUsers = (req, res) => {
            user_1.default.find({}).select("-password").exec((err, users) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                res.send(users);
            });
        };
        this.getAllWorkshops = (req, res) => {
            workshop_1.default.find({}).exec((err, workshops) => {
                if (err) {
                    res.send({ message: err });
                    return;
                }
                res.send(workshops);
            });
        };
    }
}
exports.AdminController = AdminController;
;
//# sourceMappingURL=admin.controller.js.map