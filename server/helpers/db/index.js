import { Pool } from 'pg';
import sql from './tablesSql';
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
//pool.connect();
console.log('connected to db');

pool.query(sql, () => {
	console.log('tables created');
});
export default pool;