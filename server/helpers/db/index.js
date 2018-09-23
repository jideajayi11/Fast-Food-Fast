import { Pool } from 'pg';
import sqlTest from './test.sql';
import sqlDev from './development.sql';
import env from 'dotenv';

env.config();

let parameters = {};
let tables;
if (process.env.NODE_ENV === 'test') {
  parameters = {
		user: 'postgres',
		host: 'localhost',
		database: 'testing_db',
		password: '',
		port: process.env.PORT
	};
	tables = sqlTest;
} else {
	parameters = {
		connectionString: process.env.DB_PATH
	};
	tables = sqlDev;
}
const pool = new Pool(parameters);
if(pool.connect())
	console.log('connected to db');

pool.query(tables, (err, res) => {
	console.log(err, res);
});
export default pool;