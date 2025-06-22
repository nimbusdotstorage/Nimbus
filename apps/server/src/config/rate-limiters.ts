import { RateLimiterRedis } from "rate-limiter-flexible";
import redisClient from "@/config/valkey";

export const waitlistRateLimiter = new RateLimiterRedis({
	storeClient: redisClient,
	points: 3,
	duration: 120, // 2 minutes
	blockDuration: 60 * 60, // 1 hour
	keyPrefix: "rl:waitlist",
	// insuranceLimiter: waitlistInsuranceLimiter, // TODO (Optional): Add insurance limiter using postgres (more-reliable than in-memory) - As we know, our app cannot function without the PostgreSQL database.
});
