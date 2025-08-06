import { Request, Response } from 'express';

export const getLoggedInUser = (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
};

// Redirect after successful login
export const googleCallback = (req: Request, res: Response) => {
  res.redirect(`${process.env.CLEINET_URI || 'http://localhost:5173'}`);
};

// Logout controller
export const logout = (req: Request, res: Response) => {
  req.logout(() => {
    res.redirect(`${process.env.CLEINET_URI || 'http://localhost:5173'}`);
  });
};
