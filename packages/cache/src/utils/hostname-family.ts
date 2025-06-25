import { dns } from "bun";

export async function getHostnameFamily(hostname: string): Promise<6 | 4 | null> {
	if (hostname === "localhost") {
		return 4;
	}

	try {
		const ipv6Address = await dns.lookup(hostname, { family: 6 });
		if (ipv6Address) {
			return 6;
		}
	} catch (error) {
		console.error(`Failed to resolve hostname ${hostname} over IPv6:`, error);
		try {
			const ipv4Address = await dns.lookup(hostname, { family: 4 });
			if (ipv4Address) {
				return 4;
			}
		} catch (error) {
			console.error(`Failed to resolve hostname ${hostname} over IPv4:`, error);
			return null;
		}
	}

	console.error(`Failed to resolve hostname ${hostname}`);
	return null;
}

if (import.meta.main) {
	const hostname = process.argv[2];
	if (!hostname) {
		console.error("Please provide a hostname");
		process.exit(1);
	}
	const family = await getHostnameFamily(hostname);
	console.log(`Hostname ${hostname} resolves to family ${family}`);
}
