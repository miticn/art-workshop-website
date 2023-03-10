import express from 'express';
import { UserController } from '../controllers/user.controller';
const adminRouter = express.Router();
import passport from 'passport';
import { PassportMiddleware } from '../passport.middleware';
import { AdminController } from '../controllers/admin.controller';

adminRouter.route('/approveUser').post(
    PassportMiddleware.checkAdmin,
    (req, res) => new AdminController().approveUser(req, res)
)

adminRouter.route('/rejectUser').post(
    PassportMiddleware.checkAdmin,
    (req, res) => new AdminController().rejectUser(req, res)
)

adminRouter.route('/getWaitingUsers').post(
    PassportMiddleware.checkAdmin,
    (req, res) => new AdminController().getWaitingUsers(req, res)
)

adminRouter.route('/getAllUsers').post(
    PassportMiddleware.checkAdmin,
    (req, res) => new AdminController().getAllUsers(req, res)
)

adminRouter.route('/getAllWorkshops').post(
    PassportMiddleware.checkAdmin,
    (req, res) => new AdminController().getAllWorkshops(req, res)
)

adminRouter.route('/getWorkshopRequestsOrg').post(
    PassportMiddleware.checkAdmin,
    (req, res) => new AdminController().getWorkshopRequestsOrg(req, res)
)

adminRouter.route('/getWorkshopRequestsUser').post(
    PassportMiddleware.checkAdmin,
    (req, res) => new AdminController().getWorkshopRequestsUser(req, res)
)

adminRouter.route('/approveWorkshop').post(
    PassportMiddleware.checkAdmin,
    (req, res) => new AdminController().approveWorkshop(req, res)
)

adminRouter.route('/setUserToOrg').post(
    PassportMiddleware.checkAdmin,
    (req, res) => new AdminController().setUserToOrg(req, res)
)


export default adminRouter;