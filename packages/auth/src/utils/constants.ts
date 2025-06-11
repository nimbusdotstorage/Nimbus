/**
 * IMPORTANT:
 * Edge Runtime environments do not support Node.js APIs like process.env
 * This causes A Node.js API is used (process.env) which is not supported in the Edge Runtime error
 * NOTE: auth-client throws error when importing from here
 * Error: https://github.com/nimbusdotstorage/Nimbus/pull/31#discussion_r2136774411
 */

const isDev = process.env.NODE_ENV === "development";

export const BACKEND_URL = isDev ? "http://localhost:1284" : "https://api.nimbus.storage";
export const CALLBACK_URL = isDev ? "http://localhost:3000/app" : "https://nimbus.storage/app";
export const FRONTEND_URL = isDev ? "http://localhost:3000" : "https://nimbus.storage";
