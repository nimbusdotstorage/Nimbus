import { RateLimiterRedis } from "rate-limiter-flexible";
import redisClient from "@/config/valkey";

const rateLimiter = new RateLimiterRedis({
	storeClient: redisClient,
	points: 10,
	duration: 60,
	blockDuration: 60,
	keyPrefix: "rate-limiter",
});

export default rateLimiter;
