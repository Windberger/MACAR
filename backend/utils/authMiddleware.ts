import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './jwtUtils';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token required' });
    }

    try {
        const decoded = verifyToken(token);
        (req as any).userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
