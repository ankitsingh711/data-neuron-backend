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
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redisClient = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = (0, redis_1.createClient)({
            password: process.env.REDIS_PASSKEY,
            socket: {
                host: "redis-17967.c10.us-east-1-4.ec2.cloud.redislabs.com",
                port: 17967,
            }
        });
        yield client.connect();
        console.log('Connected to Redis server');
        return client;
    }
    catch (error) {
        console.log(`Error while connecting to Redis: ${error}`);
        throw error;
    }
});
exports.default = redisClient;
