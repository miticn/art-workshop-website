"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Workshop = new Schema({
    name: {
        type: String
    },
    location: {
        type: String
    },
    description: {
        type: String
    },
    date: {
        type: Date
    },
    mainPicture: {
        type: String
    },
    gallery: {
        type: Array
    },
    availableSeats: {
        type: Number
    },
    totalSeats: {
        type: Number
    },
    descriptionLong: {
        type: String
    },
    cordinates: {
        lat: {
            type: Number
        },
        lng: {
            type: Number
        },
    },
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: {
        type: Number
    },
    status: {
        type: String
    },
});
exports.default = mongoose_1.default.model('Workshop', Workshop, 'workshops');
//# sourceMappingURL=workshop.js.map