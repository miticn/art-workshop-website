"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const workshop_router_1 = __importDefault(require("./routers/workshop.router"));
var session = require('express-session');
const passport_config_1 = require("./passport-config");
const app = (0, express_1.default)();
app.use(session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: true,
}));
mongoose_1.default.connect('mongodb://127.0.0.1:27017/art-workshop');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connection ok');
});
const passport = require('passport');
(0, passport_config_1.initialisePassport)(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use((0, cors_1.default)({ origin: [
        "http://localhost:4200"
    ], credentials: true }));
app.use(body_parser_1.default.json());
app.use('/uploads', express_1.default.static('uploads'));
const router = express_1.default.Router();
router.use('/users', user_router_1.default);
router.use('/workshops', workshop_router_1.default);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map