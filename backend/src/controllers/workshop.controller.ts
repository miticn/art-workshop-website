import * as express from 'express';
import workshop from '../models/workshop';
import comments from '../models/comments';
import likes from '../models/likes';
import attendance from '../models/attendance';
import mailService from '../mailService';
import user from '../models/user';
import messages from '../models/messages';

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
                this.sendEmailToAlert(req, res);
                attendance.findOneAndDelete({user: req.user._id, workshop: req.body.id}, (err, _) => {
                    if (err) console.log(err);
                    else res.json(workshop);
                })
            }
        });
    };

    attendingStatus = (req, res: express.Response) => {
        attendance.findOne({user: req.user._id, workshop: req.body.id}, (err, attend) => {
            if (err) console.log(err);
            else {
                res.json({status: attend ? attend.status : 'not attending'});
            }
        })
    };

    alertMe = (req, res: express.Response) => {
        let attend = new attendance({
            user: req.user._id,
            workshop: req.body.id,
            status: 'alert'
        });
        attend.save((err, _) => {
            if (err) console.log(err);
            else res.json({status: 'alert'});
        })
    };

    sendEmailToAlert = (req, res: express.Response) => {
        attendance.find({workshop: req.body.id, status: 'alert'}, (err, attends) => {
            if (err) console.log(err);
            else {
                workshop.findById(req.body.id, (err, workshop) => {
                    if (err) console.log(err);
                    else {
                        for (let attend of attends) {
                            // send email to attend.user
                            user.findById(attend.user, (err, user) => {
                                if (err) console.log(err);
                                else {
                                    new mailService().sendFreeSeatsEmail(user.email, user.name, workshop);
                                }
                            })
                        }
                    }
                })
            }
        })
    }

    createWorkshop = (req, res: express.Response) => {
        let w = new workshop({
            name: req.body.name,
            location: req.body.location,
            description: req.body.description,
            date: req.body.date,
            mainPicture: req.body.mainPicture,
            gallery: req.body.gallery,
            availableSeats: req.body.totalSeats,
            totalSeats: req.body.totalSeats,
            descriptionLong: req.body.descriptionLong,
            cordinates: req.body.cordinates,
            owner: req.user._id,
            likes: 0,
        });
        w.save((err, workshop) => {
            if (err) console.log(err);
            else res.json(workshop);
        })
    }

    getWorkshopJSON = (req, res: express.Response) => {
        let workshopId = req.body.id;
        workshop.findById(workshopId, (err, workshop) => {
            if (err) console.log(err);
            else {
                res.json({json: JSON.stringify(workshop)});
            }
        });
    }


    getMessages = (req, res: express.Response) => {
        let workshopId = req.body.id;
        let userId = req.user._id;
        //select all messages where the user is the sender or the receiver
        messages.find({$or: [{from: userId, workshop: workshopId}, {workshop: workshopId, to: userId}]}, (err, messages) => {
            if (err) console.log(err);
            else {
                res.json(messages);
            }
        });
    }

    sendMessage = (req, res: express.Response) => {
        let message = new messages({
            from: req.user._id,
            to: req.body.to,
            workshop: req.body.id,
            text: req.body.text,
            date: new Date()
        });
        message.save((err, message) => {
            if (err) console.log(err);
            else res.json(message);
        });
    }
    
}