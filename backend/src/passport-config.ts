let localStrategy = require('passport-local').Strategy;
import User from './models/user';

export function initialisePassport(passport){
    console.log('initialise Passport');
    passport.use('users-local',new localStrategy((username, password, done) => {
        User.findOne({ 'username': username, 'password': password, $or: [{'type': 'user'},{'type': 'org'}] }, (err, user) => {
            console.log(username + ' loged in');
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            return done(null, user);
        });
    }));

    passport.use('admin-local',new localStrategy((username, password, done) => {
        User.findOne({ 'username': username, 'password': password, 'type': 'admin'}, (err, user) => {
            console.log(username + ' loged in');
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            return done(null, user);
        });
    }));

    
    passport.serializeUser((user, done) => done(null, user._id));

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}