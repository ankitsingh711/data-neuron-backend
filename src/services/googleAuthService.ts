import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import { googleAuthConfig } from '../config/googleAuth';

export const GoogleAuthService = {
    configurePassport() {
        passport.use(new GoogleStrategy({
            clientID: googleAuthConfig.google.clientID,
            clientSecret: googleAuthConfig.google.clientSecret,
            callbackURL: googleAuthConfig.google.callbackURL
        }, (accessToken, refreshToken, profile, done) => {

        }))
    }
}



