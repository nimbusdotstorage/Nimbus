import { drizzle } from "drizzle-orm/node-postgres";  
import { Pool } from "pg";  
import { config } from "dotenv";  
import path from "path";  
  
// Load environment variables  
config({ path: path.resolve(process.cwd(), "../../.env") });  
  
const pool = new Pool({  
  connectionString: process.env.DATABASE_URL!  
});  
  
export const db = drizzle(pool);