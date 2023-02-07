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

adminRouter.route('/getWaitingUsers').get(
    PassportMiddleware.checkAdmin,
    (req, res) => new AdminController().getWaitingUsers(req, res)
)





export default adminRouter;