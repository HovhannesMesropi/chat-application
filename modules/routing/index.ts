import { Express } from 'express';
import { UsersRouting } from './users';

export class Routing {
    express: Express | null = null;

    constructor(express: Express){
        this.express = express;
        new UsersRouting(this.express)
    }


}