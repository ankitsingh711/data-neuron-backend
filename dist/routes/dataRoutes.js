"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataController_1 = require("../controllers/dataController");
const router = express_1.default.Router();
// Add route to add new data
router.post('/data', dataController_1.addData);
// Add route to update existing data
router.put('/data/:id', dataController_1.updateData);
// Add route to get count of add/update requests
router.get('/count', dataController_1.getCount);
exports.default = router;
