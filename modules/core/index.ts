import { Express } from 'express';
import { Sequelize } from 'sequelize';

import { UserModel } from '../../models/user';

import dotenv from 'dotenv';
import { Routing } from '../routing';
import { DialogsModel } from '../../models/dialogs';

dotenv.config();
export class Core {
    sequalize: Sequelize | null = null;
    express: Express | null = null;

    constructor(express: Express) {
        const env = process.env;

        const sequelize = new Sequelize(
            env.DATABASE_NAME,
            env.DATABASE_USERNAME,
            env.DATABASE_PASSWORD,
            {
                host: env.DATABASE_HOST,
                dialect: 'mysql',
            }
        );

        this.express = express;
        this.sequalize = sequelize;

        this.testDBConnection();
        
        this.initModels();
        this.sequalize.sync({ force: false }).then(() => {
            this.initModules();
            
        })
    }

    private initModels() {
        UserModel(this.sequalize)
        DialogsModel(this.sequalize)
    }

    private initModules() {
        new Routing(this.express);
    }

    private testDBConnection() {
        this.sequalize
            .authenticate()
            .then(() => {
                console.log('connection to DATABASE ok!.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    }
}