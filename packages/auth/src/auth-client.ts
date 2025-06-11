import { createAuthClient } from "better-auth/react";
// import { BACKEND_URL } from "./utils/constants";

export const authClient = createAuthClient({
	baseURL: process.env.NODE_ENV === "development" ? "http://localhost:1284" : "https://api.nimbus.storage",
});
