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
exports.incrementUpdateCount = exports.incrementAddCount = void 0;
const counterModel_1 = __importDefault(require("../model/counterModel"));
const incrementAddCount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield counterModel_1.default.findOneAndUpdate({}, { $inc: { addCount: 1 } }, { upsert: true });
        next();
    }
    catch (err) {
        console.error("Error incrementing add count", err);
        res.status(500).json({ error: "Error incrementing add count" });
    }
});
exports.incrementAddCount = incrementAddCount;
const incrementUpdateCount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield counterModel_1.default.findOneAndUpdate({}, { $inc: { updateCount: 1 } }, { upsert: true });
        next();
    }
    catch (err) {
        console.error("Error incrementing update count", err);
        res.status(500).json({ error: "Error incrementing update count" });
    }
});
exports.incrementUpdateCount = incrementUpdateCount;
