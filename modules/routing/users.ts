import { Express } from 'express';
import { User } from '../../models/user';
export class UsersRouting {
    express: Express | null = null;

    constructor(express: Express) {
        this.express = express;

        this.listeners();
    }

    private listeners() {

        this.express.get('/users', async (_, res) => {
            const users = await User.getAllUsers()

            const usersFiltered = users.map((user) => {
                delete user.dataValues.password;
                delete user.dataValues.token
            })

            res.status(200).send(usersFiltered);
        })

        this.express.get('/users/sign-up', async (_, res) => {

        })


    }
}