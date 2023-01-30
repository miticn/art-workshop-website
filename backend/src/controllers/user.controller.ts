import * as express from 'express';
import mailService from '../mailService';
import User from '../models/user'

export class UserController {
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        //new mailService().send();
        User.findOne({ 'username': username, 'password': password, $or: [{'type': 'user'},{'type': 'org'}] }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    loginAdmin = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({ 'username': username, 'password': password, 'type': 'admin'}, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    getUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        User.findOne({ 'username': username }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
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
            type: req.body.type
        })

        user.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
}