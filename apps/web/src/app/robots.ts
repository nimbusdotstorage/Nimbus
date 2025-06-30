import type { MetadataRoute } from "next";
// import { getBaseUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
	// const baseUrl = getBaseUrl();

	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/app/*", "/api/auth/*", "/reset-password"],
			},
		],
		// sitemap: `${baseUrl}/sitemap.xml`,
	};
}
