import * as express from 'express';
import workshop from '../models/workshop';
import comments from '../models/comments';
import likes from '../models/likes';
import attendance from '../models/attendance';
import mailService from '../mailService';
import user from '../models/user';
import messages from '../models/messages';
import { ObjectId } from 'mongodb';

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
        //crete new workshop and return with the id
        
        let w = new workshop({
            name: req.body.name,
            location: req.body.location,
            description: req.body.description,
            date: req.body.date,
            mainPicture: "default.png",
            gallery: JSON.parse(req.body.gallery),
            availableSeats: req.body.totalSeats,
            totalSeats: req.body.totalSeats,
            descriptionLong: req.body.descriptionLong,
            cordinates: {
                lat: req.body.lat,
                lng: req.body.lng
            },
            owner: req.user._id,
            likes: 0,
            status: "waiting"
        });
        w.save((err, workshop) => {
            if (err) console.log(err);
            else {
                console.log("Workshop created: "+w.name);
                req.body.id = workshop._id;
                if (req['files'].find((file) => file.fieldname === 'mainPicture')){
                    this.uploadMainPicture(req, res);
                }
                else {
                    res.json({"message": "error"});
                }
            }
        })

    }

    uploadMainPicture = (req, res: express.Response) => {
        let workshopId = req.body.id;
        const file = req['files'].find((file) => file.fieldname === 'mainPicture');
        const filename = file.filename;
        console.log('Filename: '+filename + '; WorkshopId: '+workshopId);
        if (!file) {
            const error = new Error("Please upload file");
            return res.status(400).send(error.message);
        }
        if (workshopId === undefined) {
            res.json({ mainPicture: file.filename });
        }
        else {
            workshop.findOneAndUpdate({ '_id': workshopId }, { $set: { 'mainPicture': file.filename } }, (err, resp) => {
                if (err) res.json({ error: err });
                else {
                    //console.log(resp);
                    res.json(resp);
                }
            })
        }
    }

    uploadGallery = (req, res: express.Response) => {
        const files = req['files'];
        console.log('Gallery files uploaded: '+JSON.stringify(files.map((file) => file.filename)));
        if (!files) {
            const error = new Error("Please upload files");
            return res.status(400).send(error.message);
        }
        else{
            //return all filenames
            return res.json(files.map((file) => file.filename));
        }
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
        let userId2 = req.body.userId;
        //select all messages where the user is the sender or the receiver
        messages.find({$or: [{from: userId, workshop: workshopId, to: userId2}, {workshop: workshopId, to: userId, from:userId2}]}, (err, messages) => {
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

    updateWorkshop = (req, res: express.Response) => {
        let workshopId = req.body.id;

        workshop.findByIdAndUpdate(workshopId, {
            name: req.body.name,
            location: req.body.location,
            description: req.body.description,
            date: req.body.date,
            totalSeats: req.body.totalSeats,
            descriptionLong: req.body.descriptionLong,
            cordinates: {
                lat: req.body.lat,
                lng: req.body.lng
            },
            mainPicture: req.body.mainPicture,
            gallery: JSON.parse(req.body.gallery)
        }, (err, workshop) => {
            if (err) console.log(err);
            else {
                res.json(workshop);
            }
        });
    }

    getWorkshopsByOwner = (req, res: express.Response) => {
        let owner = req.body.id;
        workshop.find({owner: owner}, (err, workshops) => {
            if (err) console.log(err);
            else {
                res.json(workshops);
            }
        });
    }

    getUsersChatingWithWorkshop = (req, res: express.Response) => {
        let workshopId = req.body.id;

        messages.find({workshop: workshopId}, (err, messages) => {
            if (err) console.log(err);
            else {
                let users = [];
                for (let message of messages) {
                    if (message.from != req.user._id) {
                        if (!users.includes(message.from)) {
                            users.push(message.from.toString());
                        }
                    }
                    else {
                        if (!users.includes(message.to)) {
                            users.push(message.to.toString());
                        }
                    }
                }
                //remove duplicates
                users = users.filter((v, i, a) => a.indexOf(v) === i);

                //remove owner from the list
                let index = users.indexOf(req.user._id.toString());
                if (index > -1) {
                    users.splice(index, 1);
                }


                res.json(users);

            }
        });
    }

    createWorkshopJSON = (req, res: express.Response) => {
        let JSONObj = JSON.parse(req.body.json);

        let ws = new workshop({
            name: JSONObj.name,
            location: JSONObj.location,
            description: JSONObj.description,
            date: JSONObj.date,
            totalSeats: JSONObj.totalSeats,
            availableSeats : JSONObj.totalSeats,
            descriptionLong: JSONObj.descriptionLong,
            cordinates: JSONObj.cordinates,
            owner: req.user._id,
            likes: JSONObj.likes,
            mainPicture: JSONObj.mainPicture,
            gallery: JSONObj.gallery,
            status: "waiting"
        });
        ws.save((err, workshop) => {
            if (err) console.log(err);
            else {
                console.log("Workshop created: "+ws.name);
                res.json(workshop);
            }
        });

    }

    getApplications = (req, res: express.Response) => {
        let workshopId = req.body.id;
        attendance.find({workshop: workshopId, status:"reserved"}, (err, applications) => {
            if (err) console.log(err);
            else {
                res.json(applications);
            }
        });
    }

    approveApplication = (req, res: express.Response) => {
        let applicationId = req.body.id;
        console.log("Approving application: "+applicationId);
        attendance.findByIdAndUpdate(applicationId, {status: "approved"}, (err, application) => {
            if (err) console.log(err);
            else {
                res.json(application);
            }
        });
    }

    cancelWorkshop = (req, res: express.Response) => {
        let workshopId = req.body.id;
        console.log("Cancelling workshop: "+workshopId);
        workshop.findByIdAndUpdate(workshopId, {status: "cancelled"}, (err, workshopOld) => {
            let workshop_name = workshopOld.name;
            if (err) console.log(err);
            else {
                //find all applications and set them to cancelled
                attendance.updateMany({workshop: workshopId}, {status: "cancelled"}, (err, rs) => {
                    if (err) console.log(err);
                    else {

                        //find all attendances
                        attendance.find({workshop: workshopId}, (err, attendances) => {
                            if (err) console.log(err);
                            else {
                                let userIds = [];
                                for (let attendance of attendances) {
                                    userIds.push(attendance.user);
                                }

                        
                                //find all users and send them an email

                                 user.find({_id: {$in: userIds}}, (err, users) => {
                                    if (err) console.log(err);
                                    else {
                                        for (let user of users) {
                                            new mailService().sendWorkshopCanceledEmail(user.email, user.firstname, workshop_name);
                                        }
                                    }
                                });
                            }
                        });
                        
                        res.json(workshop);
                    }
                });

                
            }
        });

    }

    getWorkshopsUserAttended = (req, res: express.Response) => {
        let userId = req.body.id;
        console.log("Getting workshops user attended: "+userId);
        attendance.find({user: userId, status: "approved"}, (err, attendances) => {
            if (err) console.log(err);
            else {
                let workshopIds = [];
                for (let attendance of attendances) {
                    workshopIds.push(attendance.workshop);
                }

                //find all workshops that happened in the past
                workshop.find({_id: {$in: workshopIds}, date: {$lt: new Date()}}, (err, workshops) => {
                    if (err) console.log(err);
                    else {
                        res.json(workshops);
                    }
                });
            }
        });
    }
    
}