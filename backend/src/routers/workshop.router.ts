import express from 'express';
import { PassportMiddleware } from '../passport.middleware';
import { WorkshopController } from '../controllers/workshop.controller';
const workshopRouter = express.Router();

workshopRouter.route('/getAll').get(
    (req, res) => new WorkshopController().getAll(req, res)
)

workshopRouter.route('/getById').post(
    (req, res) => new WorkshopController().getById(req, res)
)

workshopRouter.route('/comment').post(
    PassportMiddleware.checkAuthenticated,
    (req, res) => new WorkshopController().comment(req, res)
)

workshopRouter.route('/getWorkshopComments').post(
    (req, res) => new WorkshopController().getWorkshopComments(req, res)
)

workshopRouter.route('/like').post(
    PassportMiddleware.checkAuthenticated,
    (req, res) => new WorkshopController().like(req, res)
)

workshopRouter.route('/isLiked').post(
    PassportMiddleware.checkAuthenticated,
    (req, res) => new WorkshopController().isLiked(req, res)
)

export default workshopRouter;