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
                    attendance_1.default.findOneAndDelete({ user: req.user._id, workshop: req.body.id }, (err, _) => {
                        if (err)
                            console.log(err);
                        else
                            res.json(workshop);
                    });
                }
            });
        };
        this.isAttending = (req, res) => {
            attendance_1.default.findOne({ user: req.user._id, workshop: req.body.id }, (err, attend) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ attending: attend ? true : false });
                }
            });
        };
    }
}
exports.WorkshopController = WorkshopController;
//# sourceMappingURL=workshop.controller.js.map