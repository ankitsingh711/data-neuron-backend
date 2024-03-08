import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const redisClient = async () => {
  try {
    const client = createClient({
      password: process.env.REDIS_PASSKEY,
      socket: {
        host: "redis-17967.c10.us-east-1-4.ec2.cloud.redislabs.com",
        port: 17967,
      }
    });

    await client.connect();
    console.log('Connected to Redis server')
    return client;
  } catch (error) {
    console.log(`Error while connecting to Redis: ${error}`);
    throw error;
  }
};

export default redisClient;
