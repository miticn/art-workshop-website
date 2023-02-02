import express from 'express';
import { WorkshopController } from '../controllers/workshop.controller';
const workshopRouter = express.Router();

workshopRouter.route('/getAll').get(
    (req, res) => new WorkshopController().getAll(req, res)
)

export default workshopRouter;