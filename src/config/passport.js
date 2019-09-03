const passport  = require('passport');
const LocalStrategy = require('passport-local');

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'userName'
}, async (userName, password, done) => {
    const user = await User.findOne({userName: userName});
    if(!user) {
        return done(null, false);
    } else {
        const match = await user.matchPassword(password);
        if(match) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done (err, user);
    });
});