import { Response, NextFunction } from 'express';
import { ExtendedRequest } from '../types/express'; 
import jwt, { JwtPayload } from 'jsonwebtoken';

interface TokenPayload extends JwtPayload {
  isAdmin: number;
}

export const adminOnly = (req: ExtendedRequest, res: Response, next: NextFunction) => {
  const header = req.header('Authorization');
  const token = header && header.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  try {
    const decodedToken = jwt.verify(token, 'key') as TokenPayload;
    console.log("Decoded Token: ", decodedToken);

    if (decodedToken.isAdmin == 1) {
      console.log("adminOnly: ", decodedToken);
      next();
    } else {
      res.status(403).json({ message: "You must be admin" });
    }
  } catch (error) {
    console.error("Error in token verification: ", error);
    res.status(401).json({ message: "Invalid token" });
  }
};





