import { Request , Response , NextFunction } from "express";
import jwt from 'jsonwebtoken';

export const tokenMiddleWare = (req:Request , res:Response , next:NextFunction) => {
    const authtoken = req.headers.authorization;
    const SECRET_KEY = process.env.JWT_SECRET || 'secret_key';
    if(!authtoken) return  res.status(401).json({ error: 'Token missing' });
    const token = authtoken.split(' ')[1];

    try{
        const decoded = jwt.verify(token, SECRET_KEY);
        (req as any).user = decoded;
        next();
    }   

    catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}