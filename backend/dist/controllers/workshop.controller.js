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
    }
}
exports.WorkshopController = WorkshopController;
//# sourceMappingURL=workshop.controller.js.map