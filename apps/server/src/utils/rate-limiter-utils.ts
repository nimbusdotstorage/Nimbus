import type { RateLimiterAbstract, RateLimiterRes } from "rate-limiter-flexible";
import type { Context } from "hono";

export function getIp(c: Context) {
	const key =
		c.req.header("x-forwarded-for") ||
		c.req.raw.headers.get("cf-connecting-ip") ||
		c.req.raw.headers.get("x-real-ip") ||
		"anonymous";
	return key;
}

export function setRateLimitHeaders(c: Context, rateLimiterRes: RateLimiterRes, limiter: RateLimiterAbstract) {
	const limit = limiter.points.toString();
	const remaining = rateLimiterRes.remainingPoints.toString();
	const reset = Math.ceil((Date.now() + rateLimiterRes.msBeforeNext) / 1000).toString();
	const consume = (limiter.points - rateLimiterRes.remainingPoints).toString();

	c.res.headers.set("X-RateLimit-Limit", limit);
	c.res.headers.set("X-RateLimit-Remaining", remaining);
	c.res.headers.set("X-RateLimit-Reset", reset);
	c.res.headers.set("x-ratelimit-used", consume);
}
