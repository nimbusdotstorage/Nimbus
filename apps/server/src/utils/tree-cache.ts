import redisClient from "@nimbus/cache/valkey";

const CACHE_PREFIX = "tree:children:";
const CACHE_TTL = 60 * 5; // 5 minutes

export class TreeCache {
	/**
	 * Get cached children for a folder
	 * @param parentId The parent folder ID
	 * @returns Cached children or null if not found
	 */
	static async getChildren(parentId: string): Promise<any[] | null> {
		try {
			const key = `${CACHE_PREFIX}${parentId}`;
			const cached = await redisClient.get(key);

			if (cached) {
				return JSON.parse(cached);
			}

			return null;
		} catch (error) {
			console.error("Error getting cached children:", error);
			return null;
		}
	}

	/**
	 * Cache children for a folder
	 * @param parentId The parent folder ID
	 * @param children The children to cache
	 */
	static async setChildren(parentId: string, children: any[]): Promise<void> {
		try {
			const key = `${CACHE_PREFIX}${parentId}`;
			await redisClient.setex(key, CACHE_TTL, JSON.stringify(children));
		} catch (error) {
			console.error("Error setting cached children:", error);
		}
	}

	/**
	 * Invalidate cache for a folder and its parents
	 * @param folderId The folder ID to invalidate
	 */
	static async invalidateFolder(folderId: string): Promise<void> {
		try {
			const key = `${CACHE_PREFIX}${folderId}`;
			await redisClient.del(key);
		} catch (error) {
			console.error("Error invalidating folder cache:", error);
		}
	}

	/**
	 * Prefetch children for a folder (for hover prefetching)
	 * @param parentId The parent folder ID
	 * @param fetchFunction Function to fetch children if not cached
	 */
	static async prefetchChildren(parentId: string, fetchFunction: () => Promise<any[]>): Promise<any[]> {
		try {
			// Check if already cached
			const cached = await this.getChildren(parentId);
			if (cached) {
				return cached;
			}

			// Fetch and cache
			const children = await fetchFunction();
			await this.setChildren(parentId, children);
			return children;
		} catch (error) {
			console.error("Error prefetching children:", error);
			// Fallback to direct fetch
			return await fetchFunction();
		}
	}
}
