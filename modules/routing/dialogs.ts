import { Express, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Dialogs } from '../../models/dialogs';
import { AuthGuardRequest, authGuard } from '../../middlewares/authGuard';
import moment from 'moment';

export class DialogsRouting {

    express: Express

    constructor(express: Express) {
        this.express = express;

        this.Listeners();
    }

    Listeners() {

        this.express.post('/dialogs/message', [
            authGuard,
            body('to').isNumeric(),
            body('message').isString()
        ], async (req: AuthGuardRequest, res: Response) => {
            const result = validationResult(req);

            if (result.isEmpty()) {

                const message = await Dialogs.create({
                    owner: req.userId,
                    to: req.body.to,
                    message: req.body.message
                })

                res.status(200).send(message);

                return true;
            }

            res.status(400).send(result)

            return false;
        })

        this.express.get('/dialogs/message/:userId', [
            authGuard
        ], async (req: AuthGuardRequest, res: Response) => {
            const requestedUserId = req.params.userId

            const messages = await Dialogs.findAll({
                where: {
                    owner: req.userId,
                    to: requestedUserId
                }
            })

            const messagesTwo = await Dialogs.findAll({
                where: {
                    owner: requestedUserId,
                    to: req.userId
                }
            })

            res.status(200).send([...messages, ...messagesTwo].sort((a, b) => moment(a.dataValues.updatedAt).valueOf() - moment(b.dataValues.updatedAt).valueOf()));
        })
    }
}