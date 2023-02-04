"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialisePassport = void 0;
let localStrategy = require('passport-local').Strategy;
const user_1 = __importDefault(require("./models/user"));
function initialisePassport(passport) {
    console.log('initialise Passport');
    passport.use('users-local', new localStrategy((username, password, done) => {
        user_1.default.findOne({ 'username': username, 'password': password, $or: [{ 'type': 'user' }, { 'type': 'org' }] }, (err, user) => {
            console.log(username + ' loged in');
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        });
    }));
    passport.use('admin-local', new localStrategy((username, password, done) => {
        user_1.default.findOne({ 'username': username, 'password': password, 'type': 'admin' }, (err, user) => {
            console.log(username + ' loged in');
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        });
    }));
    passport.serializeUser((user, done) => done(null, user._id));
    passport.deserializeUser((id, done) => {
        user_1.default.findById(id, (err, user) => {
            done(err, user);
        });
    });
}
exports.initialisePassport = initialisePassport;
//# sourceMappingURL=passport-config.js.map