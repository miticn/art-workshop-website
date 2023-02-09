import * as express from 'express';
import mailService from '../mailService';
import User from '../models/user'
import Token from '../models/token'
import { Request, Response } from 'express';


export class UserController {
    getSessionUser = (req, res: express.Response) => {
        if(req.isAuthenticated()) {
            let user = req.user;
            if(user)
                res.json({
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
            else res.json({error: "no user"});
        }
        else res.json({error: "not authenticated"});
    }

    getUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        User.findOne({ 'username': username }, (err, user) => {
            if (err) console.log(err);
            else if(user) res.json({
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
            else res.json({error: "no user"});
        })
    }

    isUsernameFree = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        User.findOne({ 'username': username }, (err, user) => {
            if (err) console.log(err);
            else {
                if (user) res.json({free: false})
                else res.json({free: true})
            }
        })
    }

    isEmailFree = (req: express.Request, res: express.Response) => {
        let email = req.body.email;
        User.findOne({ 'email': email }, (err, user) => {
            if (err) console.log(err);
            else {
                if (user) res.json({free: false})
                else res.json({free: true})
            }
        })
    }


    register = (req: express.Request, res: express.Response)=>{
        let user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
            phone: req.body.phone,
            email: req.body.email,
            type: req.body.type,
            profilePicture: "default.png",
            verified: "waiting",
            org: JSON.parse(req.body.org)
        })
        user.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else {
                if (req['file'])
                    this.uploadProfilePicture(req, res);
                else {
                    res.json({"message": "ok"});
                }
                console.log("User registered: "+user.username);
                new mailService().sendRegisterEmail(user.email, user.firstname);
            }
        })
    }

    uploadProfilePicture = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        const file = req['file'];
        const filename = file.filename;
        console.log('Filename: '+filename + '; Username: '+username);

        if (!file) {
            const error = new Error("Please upload file");
            return res.status(400).send(error.message);
        }
        User.updateOne({ 'username': username }, { $set: { 'profilePicture': file.filename } }, (err, resp) => {
            if (err) res.json({error: err});
            else {
                res.json({message: "ok"});
            }
        })
    }
    
    isTokenValid = (req: express.Request, res: express.Response) => {
        let token = req.body.token;
        Token.findOne({ 'token': token} , (err, token) => {
            if (err) console.log(err);
            else {
                if (token) {
                    if (token.expiry > Date.now()) res.json({valid: true})
                    else {
                        res.json({valid: false})
                        token.remove();
                    }
                }
                else res.json({valid: false})
            }
        })
    }
    setNewResetPassword = (req: express.Request, res: express.Response) => {
        let token = req.body.token;
        let password = req.body.password;
        Token.findOne({ 'token': token} , (err, token) => {
            console.log('found: '+token);
            if (err) console.log(err);
            else {
                if (token) {
                    if (token.expiry > Date.now()) {
                        User.findById(token.user_id, (error, user) => {
                            if (error) {
                                console.log(error);
                            } else {
                                user.password = password;
                                user.save((err, resp)=>{
                                    if(err) {
                                        console.log(err);
                                        res.status(400).json({"message": "error"})
                                    }
                                    else {
                                        token.remove();
                                        res.json({"message": "ok"});
                                    }
                                })
                            }
                          });
                    }
                    else {
                        console.log("Token expired "+token.expiry+" "+Date.now()+" "+token.token);
                        token.remove();
                    }
                    
                }
                else console.log("Token not found "+token.token);
            }
        })

    }

    resetPasswordRequest = (req: express.Request, res: express.Response) => {
        console.log("Entered resetPasswordRequest");
        let email = req.body.email;
        User.findOne({ 'email': email}, (err, user) => {
            if (err) console.log(err);
            else {
                if (user) {
                    let token = new Token({
                        user_id: user._id,
                        token: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                        expiry: Date.now() + 1800000
                    })
                    token.save((err, resp)=>{
                        if(err) {
                            console.log(err);
                            res.status(400).json({"message": "error"})
                        }
                        else {
                            res.json({"message": "ok"});
                            new mailService().sendResetPasswordEmail(email, user.firstname, token.token);
                        }
                    });
                }
                else res.status(400).json({"message": "No user found"})
            }
        });
        

    }
    
    logout = (req, res) => {
        console.log(req.user.username+" logged out");
        req.logout(function (err) {
            res.json({"message": "ok"});
        });
    }
}