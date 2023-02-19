"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkshopController = void 0;
const workshop_1 = __importDefault(require("../models/workshop"));
const comments_1 = __importDefault(require("../models/comments"));
const likes_1 = __importDefault(require("../models/likes"));
const attendance_1 = __importDefault(require("../models/attendance"));
const mailService_1 = __importDefault(require("../mailService"));
const user_1 = __importDefault(require("../models/user"));
const messages_1 = __importDefault(require("../models/messages"));
class WorkshopController {
    constructor() {
        this.getAll = (req, res) => {
            workshop_1.default.find({}, (err, workshops) => {
                if (err)
                    console.log(err);
                else
                    res.json(workshops);
            });
        };
        this.getById = (req, res) => {
            workshop_1.default.findById(req.body.id, (err, workshop) => {
                if (err)
                    console.log(err);
                else
                    res.json(workshop);
            });
        };
        this.comment = (req, res) => {
            let commment = new comments_1.default({
                user: req.user._id,
                workshop: req.body.id,
                text: req.body.text,
                date: new Date()
            });
            commment.save((err, comment) => {
                if (err)
                    console.log(err);
                else
                    res.json(comment);
            });
        };
        this.deleteComment = (req, res) => {
            let commentId = req.body.commentId;
            comments_1.default.findByIdAndDelete(commentId, (err, comment) => {
                if (err)
                    console.log(err);
                else
                    res.json(comment);
            });
        };
        this.updateComment = (req, res) => {
            let commentId = req.body.commentId;
            let text = req.body.text;
            comments_1.default.findByIdAndUpdate(commentId, { text: text }, { returnOriginal: false }, (err, comment) => {
                if (err)
                    console.log(err);
                else
                    res.json(comment);
            });
        };
        this.getWorkshopComments = (req, res) => {
            let workshopId = req.body.id;
            comments_1.default.find({ workshop: workshopId }, (err, comments) => {
                if (err)
                    console.log(err);
                else
                    res.json(comments);
            });
        };
        this.like = (req, res) => {
            let workshopId = req.body.id;
            let liked = false;
            likes_1.default.findOne({ workshop: workshopId, user: req.user._id }, (err, like) => {
                if (err)
                    console.log(err);
                else {
                    liked = like ? true : false;
                    let inc = liked ? -1 : 1;
                    workshop_1.default.findByIdAndUpdate(workshopId, { $inc: { likes: inc } }, { returnOriginal: false }, (err, workshop) => {
                        if (err)
                            console.log(err);
                        else {
                            if (!liked) {
                                let like = new likes_1.default({
                                    user: req.user._id,
                                    workshop: workshopId,
                                });
                                like.save((err, like) => {
                                    if (err)
                                        console.log(err);
                                    else
                                        res.json(workshop);
                                });
                            }
                            else {
                                likes_1.default.findOneAndDelete({ workshop: workshopId, user: req.user._id }, (err, like) => {
                                    if (err)
                                        console.log(err);
                                    else
                                        res.json(workshop);
                                });
                            }
                        }
                    });
                }
            });
        };
        this.isLiked = (req, res) => {
            let workshopId = req.body.id;
            likes_1.default.findOne({ workshop: workshopId, user: req.user._id }, (err, like) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ liked: like ? true : false });
                }
            });
        };
        this.reserveSeat = (req, res) => {
            workshop_1.default.findByIdAndUpdate(req.body.id, { $inc: { availableSeats: -1 } }, { returnOriginal: false }, (err, workshop) => {
                if (err)
                    console.log(err);
                else {
                    let attend = new attendance_1.default({
                        user: req.user._id,
                        workshop: req.body.id,
                        status: 'reserved'
                    });
                    attend.save((err, _) => {
                        if (err)
                            console.log(err);
                        else
                            res.json(workshop);
                    });
                }
            });
        };
        this.cancelSeat = (req, res) => {
            workshop_1.default.findByIdAndUpdate(req.body.id, { $inc: { availableSeats: 1 } }, { returnOriginal: false }, (err, workshop) => {
                if (err)
                    console.log(err);
                else {
                    this.sendEmailToAlert(req, res);
                    attendance_1.default.findOneAndDelete({ user: req.user._id, workshop: req.body.id }, (err, _) => {
                        if (err)
                            console.log(err);
                        else
                            res.json(workshop);
                    });
                }
            });
        };
        this.attendingStatus = (req, res) => {
            attendance_1.default.findOne({ user: req.user._id, workshop: req.body.id }, (err, attend) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ status: attend ? attend.status : 'not attending' });
                }
            });
        };
        this.alertMe = (req, res) => {
            let attend = new attendance_1.default({
                user: req.user._id,
                workshop: req.body.id,
                status: 'alert'
            });
            attend.save((err, _) => {
                if (err)
                    console.log(err);
                else
                    res.json({ status: 'alert' });
            });
        };
        this.sendEmailToAlert = (req, res) => {
            attendance_1.default.find({ workshop: req.body.id, status: 'alert' }, (err, attends) => {
                if (err)
                    console.log(err);
                else {
                    workshop_1.default.findById(req.body.id, (err, workshop) => {
                        if (err)
                            console.log(err);
                        else {
                            for (let attend of attends) {
                                // send email to attend.user
                                user_1.default.findById(attend.user, (err, user) => {
                                    if (err)
                                        console.log(err);
                                    else {
                                        new mailService_1.default().sendFreeSeatsEmail(user.email, user.name, workshop);
                                    }
                                });
                            }
                        }
                    });
                }
            });
        };
        this.createWorkshop = (req, res) => {
            //crete new workshop and return with the id
            let w = new workshop_1.default({
                name: req.body.name,
                location: req.body.location,
                description: req.body.description,
                date: req.body.date,
                mainPicture: "default.png",
                gallery: req.body.gallery,
                availableSeats: req.body.totalSeats,
                totalSeats: req.body.totalSeats,
                descriptionLong: req.body.descriptionLong,
                cordinates: {
                    lat: req.body.lat,
                    lng: req.body.lng
                },
                owner: req.user._id,
                likes: 0,
            });
            w.save((err, workshop) => {
                if (err)
                    console.log(err);
                else {
                    console.log("Workshop created: " + w.name);
                    req.body.id = workshop._id;
                    if (req['files'].find((file) => file.fieldname === 'mainPicture')) {
                        this.uploadMainPicture(req, res);
                    }
                    else {
                        res.json({ "message": "error" });
                    }
                }
            });
        };
        this.uploadMainPicture = (req, res) => {
            let workshopId = req.body.id;
            const file = req['files'].find((file) => file.fieldname === 'mainPicture');
            const filename = file.filename;
            console.log('Filename: ' + filename + '; Username: ' + workshopId);
            if (!file) {
                const error = new Error("Please upload file");
                return res.status(400).send(error.message);
            }
            workshop_1.default.findOneAndUpdate({ '_id': workshopId }, { $set: { 'mainPicture': file.filename } }, (err, resp) => {
                if (err)
                    res.json({ error: err });
                else {
                    //console.log(resp);
                    res.json(resp);
                }
            });
        };
        this.getWorkshopJSON = (req, res) => {
            let workshopId = req.body.id;
            workshop_1.default.findById(workshopId, (err, workshop) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ json: JSON.stringify(workshop) });
                }
            });
        };
        this.getMessages = (req, res) => {
            let workshopId = req.body.id;
            let userId = req.user._id;
            //select all messages where the user is the sender or the receiver
            messages_1.default.find({ $or: [{ from: userId, workshop: workshopId }, { workshop: workshopId, to: userId }] }, (err, messages) => {
                if (err)
                    console.log(err);
                else {
                    res.json(messages);
                }
            });
        };
        this.sendMessage = (req, res) => {
            let message = new messages_1.default({
                from: req.user._id,
                to: req.body.to,
                workshop: req.body.id,
                text: req.body.text,
                date: new Date()
            });
            message.save((err, message) => {
                if (err)
                    console.log(err);
                else
                    res.json(message);
            });
        };
    }
}
exports.WorkshopController = WorkshopController;
//# sourceMappingURL=workshop.controller.js.map