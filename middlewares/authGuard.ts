import { NextFunction, Request, Response } from "express";
import { User } from '../models/user';


export type AuthGuardRequest = Request & { userId: number }

export const authGuard = async (req: AuthGuardRequest, res: Response, next: NextFunction) => {
    if (req.headers['auth']) {
        const user = await User.findOne({ where: { token: req.headers['auth'] } })
        if (user) {
            req.userId = user.dataValues.id;
            next()
            return true;
        }

        res.status(400).send({
            message: 'Invalid credentials'
        })
        
    } else {
        res.status(400).send({
            message: 'Invalid credentials'
        })
    }
}