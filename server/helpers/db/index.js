import { Pool } from 'pg';
import sql from './test.sql';
import env from 'dotenv';

env.config();

const pool = new Pool({
  connectionString: 'postgres://gvapmdrf:eNa70-_RZPVdkOCsA14WWuXRMusEXzh9@baasu.db.elephantsql.com:5432/gvapmdrf'
});
if(pool.connect())
	console.log('connected to db');

pool.query(sql, (err, res) => {
	console.log(err, res);
});
export default pool;