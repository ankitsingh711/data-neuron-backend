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
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./src/config/database"));
const cors_1 = __importDefault(require("cors"));
const dataRoutes_1 = __importDefault(require("./src/routes/dataRoutes"));
const userRoutes_1 = __importDefault(require("./src/routes/userRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const response_time_1 = __importDefault(require("response-time"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const redis_1 = __importDefault(require("./src/config/redis"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Use morgan middleware for request logging with execution time
app.use((0, morgan_1.default)(':method :url :status :response-time ms'));
app.use((0, response_time_1.default)());
// define port or port from .env
const PORT = process.env.PORT || 5000;
// using cors for cross-origin-resource-policy
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/', dataRoutes_1.default);
app.use('/', userRoutes_1.default);
// listening to the port
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, database_1.default)();
        (0, redis_1.default)();
        console.log(`Server is running on port ${PORT}`);
    }
    catch (error) {
        console.log(`Error while connecting to Database ${error}`);
    }
}));
