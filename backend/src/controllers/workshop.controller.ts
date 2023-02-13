import * as express from 'express';
import workshop from '../models/workshop';

export class WorkshopController {
    getAll = (req: express.Request, res: express.Response) => {
        workshop.find({}, (err, workshops) => {
            if (err) console.log(err);
            else res.json(workshops);
        })
    }

    getById = (req: express.Request, res: express.Response) => {
        console.log(req.body.id);
        workshop.findById(req.body.id, (err, workshop) => {
            if (err) console.log(err);
            else res.json(workshop);
        })
    }
}