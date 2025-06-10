const isDev = process.env.NODE_ENV === "development";

export const BACKEND_URL = isDev ? "http://localhost:1284" : "https://api.nimbus.storage";

export const CALLBACK_URL = isDev ? "http://localhost:3000/app" : "https://nimbus.storage/app";
