"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authenticationMiddleware_1 = require("../middleware/authenticationMiddleware");
const router = express_1.default.Router();
router.post('/login', authenticationMiddleware_1.authenticateToken, userController_1.login);
router.post('/register', userController_1.register);
router.post('/logout', userController_1.logout);
router.post('/reset-password', authenticationMiddleware_1.authenticateToken, userController_1.resetPassword);
router.post('/reset-password/:token', userController_1.resetPasswordReq);
exports.default = router;
