"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminRouter = express_1.default.Router();
const passport_middleware_1 = require("../passport.middleware");
const admin_controller_1 = require("../controllers/admin.controller");
adminRouter.route('/approveUser').post(passport_middleware_1.PassportMiddleware.checkAdmin, (req, res) => new admin_controller_1.AdminController().approveUser(req, res));
adminRouter.route('/rejectUser').post(passport_middleware_1.PassportMiddleware.checkAdmin, (req, res) => new admin_controller_1.AdminController().rejectUser(req, res));
adminRouter.route('/getWaitingUsers').post(passport_middleware_1.PassportMiddleware.checkAdmin, (req, res) => new admin_controller_1.AdminController().getWaitingUsers(req, res));
adminRouter.route('/getAllUsers').post(passport_middleware_1.PassportMiddleware.checkAdmin, (req, res) => new admin_controller_1.AdminController().getAllUsers(req, res));
adminRouter.route('/getAllWorkshops').post(passport_middleware_1.PassportMiddleware.checkAdmin, (req, res) => new admin_controller_1.AdminController().getAllWorkshops(req, res));
adminRouter.route('/getWorkshopRequestsOrg').post(passport_middleware_1.PassportMiddleware.checkAdmin, (req, res) => new admin_controller_1.AdminController().getWorkshopRequestsOrg(req, res));
adminRouter.route('/getWorkshopRequestsUser').post(passport_middleware_1.PassportMiddleware.checkAdmin, (req, res) => new admin_controller_1.AdminController().getWorkshopRequestsUser(req, res));
adminRouter.route('/approveWorkshop').post(passport_middleware_1.PassportMiddleware.checkAdmin, (req, res) => new admin_controller_1.AdminController().approveWorkshop(req, res));
adminRouter.route('/setUserToOrg').post(passport_middleware_1.PassportMiddleware.checkAdmin, (req, res) => new admin_controller_1.AdminController().setUserToOrg(req, res));
exports.default = adminRouter;
//# sourceMappingURL=admin.router.js.map