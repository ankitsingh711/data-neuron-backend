"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const log4js_1 = __importDefault(require("log4js"));
const logger = log4js_1.default.getLogger();
const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token)
            return res.sendStatus(401);
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err)
                return res.sendStatus(403);
            req.user = user;
            next();
        });
    }
    catch (error) {
        logger.error(error);
    }
};
exports.authenticateToken = authenticateToken;
