// src/middleware/authMiddleware.ts
import { Response, NextFunction } from 'express';
import { ExtendedRequest } from '../types/express';
import jwt from 'jsonwebtoken';

export const adminOnly = (req: ExtendedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  try {
    const decodedToken = jwt.verify(token, 'gizliAnahtar');

    if (decodedToken.isAdmin === 1) { // isAdmin özelliği sayı olarak tanımlandı
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
    const decodedToken = jwt.verify(token, 'gizliAnahtar');

    if (decodedToken.isAdmin === 0) { // isAdmin özelliği sayı olarak tanımlandı
      console.log("userOnly: ", decodedToken);
      next();
    } else {
      res.status(403).json({ message: "You must be a normal user" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
