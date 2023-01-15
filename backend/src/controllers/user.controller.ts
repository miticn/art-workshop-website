import * as express from 'express';
import User from '../models/user'

export class UserController {
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

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
}