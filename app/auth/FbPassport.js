// Strategy for fb

import passport from 'passport';
import FbPassport from 'passport-facebook';
import keys from '../../keys';
import User from '../models/user-model';

const FacebookStrategy = FbPassport.FacebookStrategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// Facebook strategy

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.FB_keys.clientId,
      clientSecret: keys.FB_keys.clientSecret,
      callbackURL: 'http://localhost:3000/login/facebook/redirect'
    },
    (accessToken, RefreshToken, profile, email, done) => {
      // check for already existing user
      User.findOne({ facebookId: profile.id }).then((currentUser) => {
        if (currentUser) {
          // User already exists
          console.log('Already existing user is :' + currentUser);
          done(null, currentUser);
        } else {
          // new User creation
          new User({
            fullName:
              profile.first_name +
              ' ' +
              profile.middle_name +
              ' ' +
              profile.last_name,
            facebookId: profile.id,
            email: email
          })
            .save()
            .then((newUser) => {
              console.log('New User logged in :' + newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
