import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import dotenv from 'dotenv';
import { connectDB } from './config/db.config';
import taskRoutes from './routes/taskRoutes.routes';
import keepRoutes from './routes/keep.routes';
import session from 'express-session';
import passport from 'passport';
import './config/passport.config';
import authRoutes from './routes/auth.routes';
import { isAuthenticated } from './middlewares/isAuthenticated';
import cors from 'cors';

const app = express();

app.use(express.json());
dotenv.config();
connectDB();

app.use(
  cors({
    origin: process.env.CLEINET_URI || 'http://localhost:5173',
    credentials: true,
  }),
);

// in local development,
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: 'lax',
      secure: false,
    },
  }),
);

// in production
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || 'default_secret',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       sameSite: 'none',
//       secure: true,
//       httpOnly: true,
//       maxAge: 1000 * 60 * 60 * 24 * 7,
//     },
//   }),
// );

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (_req, res) => {
  res.send('Todozit API!');
});

app.use('/auth', authRoutes);
app.use('/api/tasks', isAuthenticated, taskRoutes);
app.use('/api/keep', isAuthenticated, keepRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
