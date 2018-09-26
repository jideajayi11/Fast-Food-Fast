import { Pool } from 'pg';
import env from 'dotenv';

env.config();

const pool = new Pool({connectionString: process.env.DB_PATH_TEST});
const sql = `
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS food;
DROP TABLE IF EXISTS admin;
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
	id serial NOT NULL PRIMARY KEY,
	fullName varchar NOT NULL,
	phoneNumber varchar NOT NULL,
	deliveryAddress varchar NOT NULL,
	email varchar NOT NULL UNIQUE,
	password varchar NOT NULL,
	date varchar NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS admin (
	id serial NOT NULL PRIMARY KEY,
	restaurantName varchar NOT NULL,
	phoneNumber varchar NOT NULL,
	email varchar NOT NULL UNIQUE,
	password varchar NOT NULL,
	date varchar NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS food (
	id serial NOT NULL PRIMARY KEY,
	foodName varchar NOT NULL,
	imageURL varchar NOT NULL,
	price float NOT NULL,
	adminId integer NOT NULL,
	date varchar NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (adminId) REFERENCES admin(id)
);
CREATE TABLE IF NOT EXISTS orders (
	id serial NOT NULL PRIMARY KEY,
	quantity integer NOT NULL,
	orderStatus varchar NOT NULL,
	price float NOT NULL,
	userId integer NOT NULL,
	adminId integer NOT NULL,
	foodId integer NOT NULL,
	date varchar NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (adminId) REFERENCES admin(id),
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (foodId) REFERENCES food(id)
); `;

export default pool.query(sql, (err, res) => {
	console.log('created tables');
});