import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = new Redis({
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: Number(process.env.REDIS_PORT) || 6379,
});

redisClient.on("connect", () => console.log("Conectado ao Redis"));
redisClient.on("error", (err) => console.error("Erro no Redis:", err));

export default redisClient;
