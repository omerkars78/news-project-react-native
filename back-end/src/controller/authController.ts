import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const register = async (req: Request, res: Response) => {
  try {
    const { name, surname, email, password,isAdmin } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      surname,
      email,
      isAdmin,
      password: hashedPassword
    });

    res.status(201).json({ message: "User added", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "user insert error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "wrong password" });
    }

    const token = jwt.sign(
      { userId: user.id, isAdmin: user.isAdmin }, 
      'key',
      { expiresIn: '24h' } 
    );

    res.status(200).json({ message: "login successful", user, token });
  } catch (error) {
    res.status(500).json({ error: "login error" });
  }
};
