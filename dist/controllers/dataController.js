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
exports.getCount = exports.updateData = exports.addData = void 0;
const dataModel_1 = __importDefault(require("../model/dataModel"));
// Controller function to add new data
const addData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const newData = new dataModel_1.default({ name });
        yield newData.save();
        res.status(201).json({ message: 'Data added successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.addData = addData;
// Controller function to update existing data
const updateData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.body;
        yield dataModel_1.default.findByIdAndUpdate(id, { name });
        res.status(200).json({ message: 'Data updated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.updateData = updateData;
// Controller function to get count of add/update requests
const getCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Logic to get count from middleware or database
        const count = 0; // Placeholder, implement logic to get count
        res.status(200).json({ count });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getCount = getCount;
