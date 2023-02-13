"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkshopController = void 0;
const workshop_1 = __importDefault(require("../models/workshop"));
const comments_1 = __importDefault(require("../models/comments"));
class WorkshopController {
    constructor() {
        this.getAll = (req, res) => {
            workshop_1.default.find({}, (err, workshops) => {
                if (err)
                    console.log(err);
                else
                    res.json(workshops);
            });
        };
        this.getById = (req, res) => {
            workshop_1.default.findById(req.body.id, (err, workshop) => {
                if (err)
                    console.log(err);
                else
                    res.json(workshop);
            });
        };
        this.comment = (req, res) => {
        };
        this.getWorkshopComments = (req, res) => {
            let workshopId = req.body.id;
            comments_1.default.find({ workshop: workshopId }, (err, comments) => {
                if (err)
                    console.log(err);
                else
                    res.json(comments);
            });
        };
    }
}
exports.WorkshopController = WorkshopController;
//# sourceMappingURL=workshop.controller.js.map