"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const log4js_1 = __importDefault(require("log4js"));
const logger = log4js_1.default.getLogger();
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield userModel_1.default.findOne({ username });
        if (user && user.failedLoginAttempts > 2) {
            return res.status(301).json({
                message: "You have attempted maximum login attempts. Please try again after 10 mins",
            });
        }
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        const validPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!validPassword) {
            user.failedLoginAttempts += 1;
            yield user.save(); // Save the updated failed login attempts count
            return res.status(401).json({ message: "Invalid username or password" });
        }
        // Reset failed login attempts count on successful login
        user.failedLoginAttempts = 0;
        yield user.save();
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
        res.json({ token });
    }
    catch (error) {
        logger.error("Error during login:", error.stack);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, email } = req.body;
        console.log(req.body);
        // Check if the username already exists
        const existingUser = yield userModel_1.default.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }
        // Hash the password
        const hashedPassword = yield bcryptjs_1.default.hash(password, parseInt(process.env.SALT_ROUNDS));
        console.log(hashedPassword);
        // Create a new user
        const newUser = new userModel_1.default({ username, password: hashedPassword, email });
        yield newUser.save();
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY);
        res.json({ token });
    }
    catch (error) {
        logger.error("Error during signup:", error.stack);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.register = register;
