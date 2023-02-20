"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const express_1 = __importDefault(require("express"));
const passport_middleware_1 = require("../passport.middleware");
const workshop_controller_1 = require("../controllers/workshop.controller");
const workshopRouter = express_1.default.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/workshopPictures');
    },
    filename: (req, file, cb) => {
        let randomString = Math.random().toString(36).substring(2, 15);
        cb(null, Date.now() + '_' + randomString + '.' + file.mimetype.split('/')[1]);
    }
});
exports.upload = multer({ storage: storage });
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
workshopRouter.route('/sendMessage').post(passport_middleware_1.PassportMiddleware.checkAuthenticated, (req, res) => new workshop_controller_1.WorkshopController().sendMessage(req, res));
workshopRouter.route('/createWorkshop').post(exports.upload.any(), passport_middleware_1.PassportMiddleware.checkAuthenticated, (req, res) => new workshop_controller_1.WorkshopController().createWorkshop(req, res));
workshopRouter.route('/getWorkshopJSON').post((req, res) => new workshop_controller_1.WorkshopController().getWorkshopJSON(req, res));
workshopRouter.route('/uploadGallery').post(exports.upload.any(), passport_middleware_1.PassportMiddleware.checkAuthenticated, (req, res) => new workshop_controller_1.WorkshopController().uploadGallery(req, res));
workshopRouter.route('/uploadMainPicture').post(exports.upload.any(), passport_middleware_1.PassportMiddleware.checkAuthenticated, (req, res) => new workshop_controller_1.WorkshopController().uploadMainPicture(req, res));
workshopRouter.route('/updateWorkshop').post(passport_middleware_1.PassportMiddleware.checkAuthenticated, (req, res) => new workshop_controller_1.WorkshopController().updateWorkshop(req, res));
workshopRouter.route('/getWorkshopsByOwner').post(passport_middleware_1.PassportMiddleware.checkAuthenticated, (req, res) => new workshop_controller_1.WorkshopController().getWorkshopsByOwner(req, res));
workshopRouter.route('/getUsersChatingWithWorkshop').post(passport_middleware_1.PassportMiddleware.checkAuthenticated, (req, res) => new workshop_controller_1.WorkshopController().getUsersChatingWithWorkshop(req, res));
workshopRouter.route('/createWorkshopJSON').post(passport_middleware_1.PassportMiddleware.checkAuthenticated, (req, res) => new workshop_controller_1.WorkshopController().createWorkshopJSON(req, res));
workshopRouter.route('/getApplications').post(passport_middleware_1.PassportMiddleware.checkAuthenticated, (req, res) => new workshop_controller_1.WorkshopController().getApplications(req, res));
exports.default = workshopRouter;
//# sourceMappingURL=workshop.router.js.map