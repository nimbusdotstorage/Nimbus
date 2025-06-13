import { env } from "@/config/env";
import Valkey from "iovalkey";

const valkeyClient = new Valkey({
	port: env.VALKEY_PORT,
	host: env.VALKEY_HOST,
	username: env.VALKEY_USERNAME,
	password: env.VALKEY_PASSWORD,
	db: env.VALKEY_DB,
});

export default valkeyClient;
