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
const counterModel_1 = __importDefault(require("../model/counterModel"));
// Controller function to add new data
const addData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if there is any existing data
        const existingData = yield dataModel_1.default.find({});
        if (existingData.length > 0) {
            // Clear existing data
            yield dataModel_1.default.deleteMany({});
        }
        const newData = new dataModel_1.default(req.body);
        yield newData.save();
        res.status(201).json(newData);
    }
    catch (err) {
        console.error("Error adding data", err);
        res.status(500).json({ error: "Error adding data" });
    }
});
exports.addData = addData;
// Controller function to update existing data
const updateData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        yield dataModel_1.default.findByIdAndUpdate(id, updatedData);
        res.status(200).json({ message: "Data updated successfully" });
    }
    catch (err) {
        console.error("Error updating data", err);
        res.status(500).json({ error: "Error updating data" });
    }
});
exports.updateData = updateData;
// Controller function to get count of add/update requests
const getCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const counters = yield counterModel_1.default.find({});
        console.log(counters);
        res.status(200).json(counters);
    }
    catch (err) {
        console.error("Error retrieving counts", err);
        res.status(500).json({ error: "Error retrieving counts" });
    }
});
exports.getCount = getCount;
