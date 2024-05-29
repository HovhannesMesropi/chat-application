import { Express } from 'express';
import { UsersRouting } from './users';
import { DialogsRouting } from './dialogs';

export class Routing {
    express: Express;

    constructor(express: Express){
        this.express = express;
        new UsersRouting(this.express);
        new DialogsRouting(this.express);
    }


}