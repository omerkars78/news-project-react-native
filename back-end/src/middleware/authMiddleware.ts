import { Response, NextFunction } from 'express';
import { ExtendedRequest } from '../types/express'; 
import jwt, { JwtPayload } from 'jsonwebtoken';

interface TokenPayload extends JwtPayload {
  isAdmin: number;
}

export const adminOnly = (req: ExtendedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  try {
    const decodedToken = jwt.verify(token, 'gizliAnahtar') as TokenPayload;

    if (decodedToken.isAdmin === 1) {
      console.log("adminOnly: ", decodedToken);
      next();
    } else {
      res.status(403).json({ message: "You must be admin" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const userOnly = (req: ExtendedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  try {
    const decodedToken = jwt.verify(token, 'key') as TokenPayload;

    if (decodedToken.isAdmin === 0) {
      console.log("userOnly: ", decodedToken);
      next();
    } else {
      res.status(403).json({ message: "You must be a normal user" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
