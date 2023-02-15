import * as express from 'express';
import workshop from '../models/workshop';
import comments from '../models/comments';
import likes from '../models/likes';
import attendance from '../models/attendance';

export class WorkshopController {
    getAll = (req: express.Request, res: express.Response) => {
        workshop.find({}, (err, workshops) => {
            if (err) console.log(err);
            else res.json(workshops);
        })
    }

    getById = (req: express.Request, res: express.Response) => {
        workshop.findById(req.body.id, (err, workshop) => {
            if (err) console.log(err);
            else res.json(workshop);
        })
    }

    comment = (req, res: express.Response) => {
        let commment = new comments({
            user: req.user._id,
            workshop: req.body.id,
            text: req.body.text,
            date: new Date()
        });
        commment.save((err, comment) => {
            if (err) console.log(err);
            else res.json(comment);
        });
    }

    deleteComment = (req, res: express.Response) => {
        let commentId = req.body.commentId;
        comments.findByIdAndDelete(commentId, (err, comment) => {
            if (err) console.log(err);
            else res.json(comment);
        });
    }

    updateComment = (req, res: express.Response) => {
        let commentId = req.body.commentId;
        let text = req.body.text;
        comments.findByIdAndUpdate(commentId, {text: text}, {returnOriginal: false}, (err, comment) => {
            if (err) console.log(err);
            else res.json(comment);
        });
    }

    getWorkshopComments = (req: express.Request, res: express.Response) => {
        let workshopId = req.body.id;
        comments.find({workshop: workshopId}, (err, comments) => {
            if (err) console.log(err);
            else res.json(comments);
        })
    }

    like = (req, res: express.Response) => {
        let workshopId = req.body.id;
        let liked = false;
        likes.findOne({workshop: workshopId, user: req.user._id}, (err, like) => {
            if (err) console.log(err);
            else {
                liked = like ? true : false
                let inc = liked ? -1 : 1;
                workshop.findByIdAndUpdate(workshopId, { $inc: { likes: inc } }, { returnOriginal: false }, (err, workshop) => {
                    if (err) console.log(err);
                    else {
                        if (!liked) {
                            let like = new likes({
                                user: req.user._id,
                                workshop: workshopId,
                            });
                            like.save((err, like) => {
                                if (err) console.log(err);
                                else res.json(workshop);
                            });
                        } else {
                            likes.findOneAndDelete({workshop: workshopId, user: req.user._id}, (err, like) => {
                                if (err) console.log(err);
                                else res.json(workshop);
                            })
                        }
                    }
                })
            }
        })
    }

    isLiked = (req, res: express.Response) => {
        let workshopId = req.body.id;
        likes.findOne({workshop: workshopId, user: req.user._id}, (err, like) => {
            if (err) console.log(err);
            else {
                res.json({liked: like ? true : false});
            }
        })
    }

    reserveSeat = (req, res: express.Response) => {
        workshop.findByIdAndUpdate(req.body.id, { $inc: { availableSeats: -1 } }, { returnOriginal: false }, (err, workshop) => {
            if (err) console.log(err);
            else {
                let attend = new attendance({
                    user: req.user._id,
                    workshop: req.body.id,
                    status: 'reserved'
                });
                attend.save((err, _) => {
                    if (err) console.log(err);
                    else res.json(workshop);
                })
            }
        })
    }

    cancelSeat = (req, res: express.Response) => {
        workshop.findByIdAndUpdate(req.body.id, { $inc: { availableSeats: 1 } }, { returnOriginal: false }, (err, workshop) => {
            if (err) console.log(err);
            else {
                attendance.findOneAndDelete({user: req.user._id, workshop: req.body.id}, (err, _) => {
                    if (err) console.log(err);
                    else res.json(workshop);
                })
            }
        });
    };

    isAttending = (req, res: express.Response) => {
        attendance.findOne({user: req.user._id, workshop: req.body.id}, (err, attend) => {
            if (err) console.log(err);
            else {
                res.json({attending: attend ? true : false});
            }
        })
    };
}