const sql = `
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
	id serial NOT NULL PRIMARY KEY,
	fullName varchar NOT NULL,
	phoneNumber varchar NOT NULL,
	deliveryAddress varchar NOT NULL,
	email varchar NOT NULL,
	password varchar NOT NULL,
	date varchar NOT NULL DEFAULT CURRENT_TIMESTAMP
);



DROP TABLE IF EXISTS admin CASCADE;
CREATE TABLE admin (
	id serial NOT NULL PRIMARY KEY,
	restaurantName varchar NOT NULL,
	phoneNumber varchar NOT NULL,
	email varchar NOT NULL,
	password varchar NOT NULL,
	date varchar NOT NULL DEFAULT CURRENT_TIMESTAMP
);



DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders (
	id serial NOT NULL PRIMARY KEY,
	quantity integer NOT NULL,
	orderStatus varchar NOT NULL,
	price DECIMAL NOT NULL,
	userId integer NOT NULL,
	adminId integer NOT NULL,
	foodId integer NOT NULL,
	date varchar NOT NULL DEFAULT CURRENT_TIMESTAMP
);


DROP TABLE IF EXISTS food CASCADE;
CREATE TABLE food (
	id serial NOT NULL PRIMARY KEY,
	foodName varchar NOT NULL,
	imageURL varchar NOT NULL,
	price DECIMAL NOT NULL,
	adminId integer NOT NULL,
	date varchar NOT NULL DEFAULT CURRENT_TIMESTAMP
); `;

export default sql;