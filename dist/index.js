"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./src/config/database"));
const cors_1 = __importDefault(require("cors"));
const dataRoutes_1 = __importDefault(require("./src/routes/dataRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Use morgan middleware for request logging with execution time
app.use((0, morgan_1.default)(':method :url :status :response-time ms'));
// define port or port from .env
const PORT = process.env.PORT || 5000;
// using cors for cross-origin-resource-policy
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/', dataRoutes_1.default);
// listening to the port
app.listen(PORT, () => {
    try {
        (0, database_1.default)();
        console.log(`Server is running on port ${PORT}`);
    }
    catch (error) {
        console.log(`Error while connecting to Database ${error}`);
    }
});
