import express from 'express';
import { WorkshopController } from '../controllers/workshop.controller';
const workshopRouter = express.Router();

workshopRouter.route('/getAll').get(
    (req, res) => new WorkshopController().getAll(req, res)
)

workshopRouter.route('/getById').post(
    (req, res) => new WorkshopController().getById(req, res)
)

workshopRouter.route('/comment').post(
    (req, res) => new WorkshopController().comment(req, res)
)

workshopRouter.route('/getWorkshopComments').post(
    (req, res) => new WorkshopController().getWorkshopComments(req, res)
)

export default workshopRouter;