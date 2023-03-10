import { UserController } from "./user.controller";
import User  from "../models/user";
import mailService from "../mailService";
import workshop from "../models/workshop";
import user from "../models/user";

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

    getAllUsers = (req, res) => {
        User.find({}).select("-password").exec((err, users) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.send(users);
        });
    }

    getAllWorkshops = (req, res) => {
        workshop.find({}).exec((err, workshops) => {
            if (err) {
                res.send({ message: err });
                return;
            }
            res.send(workshops);
        });
    }

    getWorkshopRequestsOrg = (req, res) => {
        workshop.find({status: 'waiting'})
            .populate({
                path: 'owner',
                match: { type: 'org' }
            })
            .exec((err, workshops) => {
                if (err) {
                    res.send({ message: err });
                    return;
                } else {
                    const filteredWorkshops = workshops.filter(workshop => workshop.owner !== null);
                    res.send(filteredWorkshops);
                }
            });
    }

    getWorkshopRequestsUser = (req, res) => {
        workshop.find({status: 'waiting'})
            .populate({
                path: 'owner',
                match: { type: 'user' }
            })
            .exec((err, workshops) => {
                if (err) {
                    res.send({ message: err });
                    return;
                } else {
                    const filteredWorkshops = workshops.filter(workshop => workshop.owner !== null);
                    res.send(filteredWorkshops);
                }
            });
    }

    approveWorkshop = (req, res) => {
        let workshopId = req.body.workshopId;
        workshop.findOne({ _id: workshopId }, (err, workshop) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!workshop) {
                res.status(404).send({ message: "Workshop Not found." });
                return;
            }
            workshop.status = "approved";
            workshop.save((err) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                res.send({ message: "Workshop was approved successfully!" });
            });
        });
    }

    setUserToOrg = (req, res) => {
        let userId = req.body.userId;

        // find user and update type to org
        user.findOne({ _id: userId }, (err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!user) {
                res.status(404).send({ message: "User Not found." });
                return;
            }
            user.type = "org";
            user.save((err) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                res.send({ message: "User was updated successfully!" });
            });
        });
    }
};