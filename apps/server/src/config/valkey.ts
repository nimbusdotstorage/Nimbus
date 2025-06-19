import { env } from "@/config/env";
import { Redis } from "iovalkey";

const redisClient = new Redis({
	port: env.VALKEY_PORT,
	host: env.VALKEY_HOST,
	username: env.VALKEY_USERNAME,
	password: env.VALKEY_PASSWORD,
});

redisClient.on("error", err => {
	console.error("Redis connection error:", err);
});

redisClient.on("connect", () => {
	console.log("Connected to Valkey");
});

export default redisClient;
