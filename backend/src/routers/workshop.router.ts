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

workshopRouter.route('/deleteComment').post(
    PassportMiddleware.checkAuthenticated,
    (req, res) => new WorkshopController().deleteComment(req, res)
)

workshopRouter.route('/updateComment').post(
    PassportMiddleware.checkAuthenticated,
    (req, res) => new WorkshopController().updateComment(req, res)
)

workshopRouter.route('/reserveSeat').post(
    PassportMiddleware.checkAuthenticated,
    (req, res) => new WorkshopController().reserveSeat(req, res)
)

workshopRouter.route('/cancelSeat').post(
    PassportMiddleware.checkAuthenticated,
    (req, res) => new WorkshopController().cancelSeat(req, res)
)

workshopRouter.route('/attendingStatus').post(
    PassportMiddleware.checkAuthenticated,
    (req, res) => new WorkshopController().attendingStatus(req, res)
)

workshopRouter.route('/alertMe').post(
    PassportMiddleware.checkAuthenticated,
    (req, res) => new WorkshopController().alertMe(req, res)
)

workshopRouter.route('/getMessages').post(
    PassportMiddleware.checkAuthenticated,
    (req, res) => new WorkshopController().getMessages(req, res)
)

workshopRouter.route('/sendMessage').post(
    PassportMiddleware.checkAuthenticated,
    (req, res) => new WorkshopController().sendMessage(req, res)
)


export default workshopRouter;