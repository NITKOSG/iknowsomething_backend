//Strategy for google

import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import keys from '../../keys';
import User from '../models/user-model';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// Google Strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.GoogleKeys.clientId,
      clientSecret: keys.GoogleKeys.clientSecret,
      callbackURL: 'http://localhost:3000/login/google/redirect',
    },
    (accessToken, refreshToken, profile, done) => {
      // check for already existing user
      User.findOne({ facebookId: profile.id }).then((currentUser) => {
        if (currentUser) {
          // User already exists
          console.log(`Already existing user is : ${currentUser}`);
          done(null, currentUser);
        } else {
          // new User creation
          new User({
            username: profile.displayName,
            googleId: profile.id,
            gender: profile.gender,
          })
            .save()
            .then((newUser) => {
              console.log(`New User logged in :${newUser}`);
              done(null, newUser);
            });
        }
      });
    }
  ),
);