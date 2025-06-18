import { RateLimiterRedis } from "rate-limiter-flexible";
import redisClient from "@/config/valkey";
import { env } from "@/config/env";

export const rateLimiterPrefix = {
	// loggedInUserPrimaryRateLimiterPrefix: "logged-in-user-primary-rate-limiter",
	// loggedInUserSecondaryRateLimiterPrefix: "logged-in-user-secondary-rate-limiter",
	// anonymousUserRateLimiterPrefix: "anonymous-user-rate-limiter",

	loggedInUser: "rl-logged-in-user",
	anonymousUser: "rl-anonymous-user",
	waitlist: "rl-waitlist",
};

export const loggedInUserRateLimiter = new RateLimiterRedis({
	storeClient: redisClient,
	points: env.LOGGED_IN_USER_PRIMARY_RATE_LIMITER_POINTS,
	duration: env.LOGGED_IN_USER_PRIMARY_RATE_LIMITER_DURATION,
	blockDuration: env.LOGGED_IN_USER_PRIMARY_RATE_LIMITER_BLOCK_DURATION,
	keyPrefix: rateLimiterPrefix.loggedInUser,
	// insuranceLimiter: loggedInUserInsuranceLimiter, // TODO: Add insurance limiter using postgres (more-reliable than in-memory) - As we know, our app cannot function without the PostgreSQL database.
});

// export const loggedInUserPrimaryRateLimiter = new RateLimiterRedis({
// 	storeClient: redisClient,
// 	points: env.LOGGED_IN_USER_PRIMARY_RATE_LIMITER_POINTS,
// 	duration: env.LOGGED_IN_USER_PRIMARY_RATE_LIMITER_DURATION,
// 	blockDuration: env.LOGGED_IN_USER_PRIMARY_RATE_LIMITER_BLOCK_DURATION,
// 	keyPrefix: rateLimiterPrefix.loggedInUserPrimaryRateLimiterPrefix,
// });

// export const loggedInUserSecondaryRateLimiter = new RateLimiterRedis({
// 	storeClient: redisClient,
// 	points: env.LOGGED_IN_USER_SECONDARY_RATE_LIMITER_POINTS,
// 	duration: env.LOGGED_IN_USER_SECONDARY_RATE_LIMITER_DURATION,
// 	blockDuration: env.LOGGED_IN_USER_SECONDARY_RATE_LIMITER_BLOCK_DURATION,
// 	keyPrefix: rateLimiterPrefix.loggedInUserSecondaryRateLimiterPrefix,
// });

// export const loggedInUserRateLimiter = new RateLimiterUnion(
// 	loggedInUserPrimaryRateLimiter,
// 	loggedInUserSecondaryRateLimiter
// );

export const anonymousUserRateLimiter = new RateLimiterRedis({
	storeClient: redisClient,
	points: env.ANONYMOUS_USER_RATE_LIMITER_POINTS,
	duration: env.ANONYMOUS_USER_RATE_LIMITER_DURATION,
	blockDuration: env.ANONYMOUS_USER_RATE_LIMITER_BLOCK_DURATION,
	keyPrefix: rateLimiterPrefix.anonymousUser,
	// insuranceLimiter: anonymousUserInsuranceLimiter, // TODO: Add insurance limiter using postgres (more-reliable than in-memory) - As we know, our app cannot function without the PostgreSQL database.
});

export const waitlistRateLimiter = new RateLimiterRedis({
	storeClient: redisClient,
	points: 3,
	duration: 120, // 2 minutes
	blockDuration: 60 * 60, // 1 hour
	keyPrefix: rateLimiterPrefix.waitlist,
	// insuranceLimiter: waitlistInsuranceLimiter, // TODO: Add insurance limiter using postgres (more-reliable than in-memory) - As we know, our app cannot function without the PostgreSQL database.
});
