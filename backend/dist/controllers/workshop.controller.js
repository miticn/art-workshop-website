"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkshopController = void 0;
const workshop_1 = __importDefault(require("../models/workshop"));
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
            console.log(req.body.id);
            workshop_1.default.findById(req.body.id, (err, workshop) => {
                if (err)
                    console.log(err);
                else
                    res.json(workshop);
            });
        };
    }
}
exports.WorkshopController = WorkshopController;
//# sourceMappingURL=workshop.controller.js.map