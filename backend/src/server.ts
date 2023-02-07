import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import userRouter from './routers/user.router'
import workshopRouter from './routers/workshop.router';
var session = require('express-session');
import { initialisePassport } from './passport-config';
import passport from 'passport';
const app = express();
app.use(session({
  secret: "supersecret",
  resave: false,
  saveUninitialized: true,
}))

import User from './models/user';
import adminRouter from './routers/admin.router';

mongoose.connect('mongodb://127.0.0.1:27017/art-workshop');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('db connection ok')
})


const passport = require('passport');
initialisePassport(passport)


app.use(passport.initialize())
app.use(passport.session())






app.use(cors({origin: [
    "http://localhost:4200"
  ], credentials: true}));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));



const router = express.Router();
router.use('/users', userRouter)
router.use('/workshops', workshopRouter)
router.use('/admin', adminRouter)

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));