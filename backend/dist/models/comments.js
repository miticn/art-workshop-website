"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Comments = new Schema({
    text: {
        type: String
    },
    date: {
        type: Date
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    workshop: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Workshop'
    }
});
exports.default = mongoose_1.default.model('Comments', Comments, 'comments');
//# sourceMappingURL=comments.js.map