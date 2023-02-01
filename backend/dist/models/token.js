"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Token = new Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    expiry: {
        type: Date
    },
    token: {
        type: String
    },
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    }
});
exports.default = mongoose_1.default.model('Token', Token, 'resetPassword');
//# sourceMappingURL=token.js.map