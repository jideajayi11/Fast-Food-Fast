import { Pool } from 'pg';
import env from 'dotenv';

env.config();

let parameters = {};
if (process.env.NODE_ENV === 'test') {
  parameters = {
    connectionString: process.env.DB_PATH_TEST
  };
} else {
  parameters = {
    connectionString: process.env.DB_PATH
  };
}
const pool = new Pool(parameters);

export default pool;
