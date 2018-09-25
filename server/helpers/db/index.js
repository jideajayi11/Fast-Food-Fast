import { Pool } from 'pg';
import tables from './tablesSql';
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

pool.query(tables, (err, res) => {
	console.log(err, res);
});
export default pool;