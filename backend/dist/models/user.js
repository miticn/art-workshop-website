"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let User = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    type: {
        type: String
    },
    profilePicture: {
        type: String
    },
    verified: {
        type: Boolean
    },
    org: {
        city: {
            type: String
        },
        country: {
            type: String
        },
        name: {
            type: String
        },
        postNumer: {
            type: String
        },
        regNumber: {
            type: String
        },
        street: {
            type: String
        },
        streetNumber: {
            type: String
        }
    }
});
exports.default = mongoose_1.default.model('User', User, 'users');
//# sourceMappingURL=user.js.map