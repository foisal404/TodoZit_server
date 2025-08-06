import express from 'express';
import passport from 'passport';
import {
  getLoggedInUser,
  googleCallback,
  logout,
} from '../controllers/auth.controller';

const router = express.Router();

router.get('/user', getLoggedInUser);
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  googleCallback,
);

router.get('/logout', logout);

export default router;
