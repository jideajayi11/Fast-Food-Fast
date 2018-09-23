import { Pool } from 'pg';
import tables from './tables.sql';
import env from 'dotenv';

env.config();

let parameters = {};
if (process.env.NODE_ENV === 'test') {
  parameters = {
		user: 'postgres',
		host: 'localhost',
		database: 'travis_ci_test',
		password: '',
		port: process.env.PORT
	};
} else {
	parameters = {
		connectionString: process.env.DB_PATH
	};
}
const pool = new Pool(parameters);
if(pool.connect())
	console.log('connected to db');

pool.query(tables, (err, res) => {
	console.log(err, res);
});
export default pool;