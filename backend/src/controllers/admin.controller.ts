import { UserController } from "./user.controller";
import User  from "../models/user";
import mailService from "../mailService";

export class AdminController {
    approveUser = (req, res) => {
        let username = req.body.username;
        User.findOne({ username: username }, (err, user) => {
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
                new mailService().sendVerifiedAccountEmail(user.email, user.name, user.username);
                res.send({ message: "User was approved successfully!" });

            });
        });
    }

    rejectUser = (req, res) => {
        let username = req.body.username;
        User.findOne({ username: username }, (err, user) => {
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
                new mailService().sendRejectedAccountEmail(user.email, user.name, user.username);
                res.send({ message: "User was rejected successfully!" });

            });
        });
    }

    getWaitingUsers = (req, res) => {
        User.find({ verified: "waiting" }).select("-password").exec((err, users) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.send(users);
        });
    }
};