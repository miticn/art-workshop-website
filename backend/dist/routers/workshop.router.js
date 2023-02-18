"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_middleware_1 = require("../passport.middleware");
const workshop_controller_1 = require("../controllers/workshop.controller");
const workshopRouter = express_1.default.Router();
workshopRouter.route('/getAll').get((req, res) => new workshop_controller_1.WorkshopController().getAll(req, res));
workshopRouter.route('/getById').post((req, res) => new workshop_controller_1.WorkshopController().getById(req, res));
workshopRouter.route('/comment').post(passport_middleware_1.PassportMiddleware.checkAuthenticated, (req, res) => new workshop_controller_1.WorkshopController().comment(req, res));
workshopRouter.route('/getWorkshopComments').post((req, res) => new workshop_controller_1.WorkshopController().getWorkshopComments(req, res));
workshopRouter.route('/like').post(passport_middleware_1.PassportMiddleware.checkAuthenticated, (req, res) => new workshop_controller_1.WorkshopController().like(req, res));
workshopRouter.route('/isLiked').post(passport_middleware_1.PassportMiddleware.checkAuthenticated, (req, res) => new workshop_controller_1.WorkshopController().isLiked(req, res));
workshopRouter.route('/deleteComment').post(passport_middleware_1.PassportMiddleware.checkAuthenticated, (req, res) => new workshop_controller_1.WorkshopController().deleteComment(req, res));
workshopRouter.route('/updateComment').post(passport_middleware_1.PassportMiddleware.checkAuthenticated, (req, res) => new workshop_controller_1.WorkshopController().updateComment(req, res));
workshopRouter.route('/reserveSeat').post(passport_middleware_1.PassportMiddleware.checkAuthenticated, (req, res) => new workshop_controller_1.WorkshopController().reserveSeat(req, res));
workshopRouter.route('/cancelSeat').post(passport_middleware_1.PassportMiddleware.checkAuthenticated, (req, res) => new workshop_controller_1.WorkshopController().cancelSeat(req, res));
workshopRouter.route('/attendingStatus').post(passport_middleware_1.PassportMiddleware.checkAuthenticated, (req, res) => new workshop_controller_1.WorkshopController().attendingStatus(req, res));
workshopRouter.route('/alertMe').post(passport_middleware_1.PassportMiddleware.checkAuthenticated, (req, res) => new workshop_controller_1.WorkshopController().alertMe(req, res));
workshopRouter.route('/getMessages').post(passport_middleware_1.PassportMiddleware.checkAuthenticated, (req, res) => new workshop_controller_1.WorkshopController().getMessages(req, res));
exports.default = workshopRouter;
//# sourceMappingURL=workshop.router.js.map