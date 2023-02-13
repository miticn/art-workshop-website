"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workshop_controller_1 = require("../controllers/workshop.controller");
const workshopRouter = express_1.default.Router();
workshopRouter.route('/getAll').get((req, res) => new workshop_controller_1.WorkshopController().getAll(req, res));
workshopRouter.route('/getById').post((req, res) => new workshop_controller_1.WorkshopController().getById(req, res));
workshopRouter.route('/comment').post((req, res) => new workshop_controller_1.WorkshopController().comment(req, res));
workshopRouter.route('/getWorkshopComments').post((req, res) => new workshop_controller_1.WorkshopController().getWorkshopComments(req, res));
exports.default = workshopRouter;
//# sourceMappingURL=workshop.router.js.map