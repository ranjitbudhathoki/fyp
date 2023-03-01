import { Request, Response } from 'express';

const checkLoggedIn = (req: Request, res: Response, next: any) => {
  const isLoggedIn = req.isAuthenticated() && req.user;
  if (!isLoggedIn) {
    return res.status(401).json({
      error: 'Oh Oh! It seems like you are not logged in.😟',
    });
  }
  next();
};

export default checkLoggedIn;
