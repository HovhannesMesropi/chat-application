import dotenv from 'dotenv';
import { Express, Request, Response } from 'express';
import { User } from '../../models/user';
import { body, validationResult } from 'express-validator';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';

dotenv.config();

export class UsersRouting {
    express: Express;

    constructor(express: Express) {
        this.express = express;

        this.Listeners();
    }

    private Listeners() {

        this.express.get('/users', async (_, res) => {
            const users = await User.getAllUsers()

            const usersFiltered = users.map((user) => {
                delete user.dataValues.password;
                delete user.dataValues.token

                return user.dataValues
            })

            res.status(200).send(usersFiltered);
        })

        this.express.post('/users/sign-up', [
            body('nickname').isString().isLength({ min: 3, max: 12 }),
            body('password').isString().isLength({ min: 3, max: 12 }),
        ], async (req: Request, res: Response) => {
            const validation = validationResult(req)
            if (validation.isEmpty()) {
                const result = await User.registerUser(req.body.nickname, req.body.password);
                if (result) {
                    res.status(200).send(true);
                    return true;
                }
                res.status(400).send({
                    message: 'account allready exists'
                })
                return true;
            }

            res.status(400).send(validation);

            return false;
        })

        this.express.post('/users/sign-in', [
            body('nickname').isString().isLength({ min: 3, max: 12 }),
            body('password').isString().isLength({ min: 3, max: 12 }),
        ], async (req: Request, res: Response) => {
            const validation = validationResult(req)
            if (validation.isEmpty()) {
                const user = await User.findOne({ where: { nickname: req.body.nickname } });
                if (user) {
                    const passwordIsValid = await compare(req.body.password, user.dataValues.password);

                    if (passwordIsValid) {
                        const token = await sign({
                            id: user.dataValues.id,
                            nickname: user.dataValues.nickname
                        }, process.env.SECRET as string)

                        user.update({ token })

                        await user.save();

                        res.status(200).send({ token })
                    }
                } else {
                    res.status(400).send({ message: "Incorrect username or password" })

                    return false;
                }


                return true;
            }

            res.status(400).send(validation);

            return false;
        })
    }
}