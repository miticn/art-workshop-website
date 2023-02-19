import express from 'express';
import { PassportMiddleware } from '../passport.middleware';
import { WorkshopController } from '../controllers/workshop.controller';
const workshopRouter = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, 'uploads/workshopPictures');
    },
    filename: (req: any, file: any, cb: any) => {
        let randomString = Math.random().toString(36).substring(2, 15);
        cb(null, Date.now() + '_' + randomString+ '.' + file.mimetype.split('/')[1]);
    }
});

export var upload = multer({ storage: storage });

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

workshopRouter.route('/createWorkshop').post(
    upload.any(),
    PassportMiddleware.checkAuthenticated,
    (req, res) => new WorkshopController().createWorkshop(req, res)
)

workshopRouter.route('/getWorkshopJSON').post(
    (req, res) => new WorkshopController().getWorkshopJSON(req, res)
)

workshopRouter.route('/uploadGallery').post(
    upload.any(),
    PassportMiddleware.checkAuthenticated,
    (req, res) => new WorkshopController().uploadGallery(req, res)
)

workshopRouter.route('/uploadMainPicture').post(
    upload.any(),
    PassportMiddleware.checkAuthenticated,
    (req, res) => new WorkshopController().uploadMainPicture(req, res)
)

workshopRouter.route('/updateWorkshop').post(
    PassportMiddleware.checkAuthenticated,
    (req, res) => new WorkshopController().updateWorkshop(req, res)
)

workshopRouter.route('/getWorkshopsByOwner').post(
    PassportMiddleware.checkAuthenticated,
    (req, res) => new WorkshopController().getWorkshopsByOwner(req, res)
)

export default workshopRouter;