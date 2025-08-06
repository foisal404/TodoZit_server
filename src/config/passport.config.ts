import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.model';
import dotenv from 'dotenv';
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.BASE_URL + 'auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            email: profile.emails?.[0].value ?? '',
            name: profile.displayName,
            photo: profile.photos?.[0].value,
          });
        }

        done(null, user);
      } catch (err) {
        done(err as any, undefined);
      }
    },
  ),
);

// Serialize user ID to session
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user by ID from session
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user || false);
  } catch (err) {
    done(err as any, false);
  }
});
