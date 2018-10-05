# Fast-Food-Fast
Fast-Food-Fast is a food delivery service app, this is where food sellers meet buyers.
Users can order for food from any registered restaurant in the app.
Restaurant Admin can add, edit, delete food and manage orders made to their restaurant.


[![Coverage Status](https://coveralls.io/repos/github/jideajayi11/Fast-Food-Fast/badge.svg?branch=develop)](https://coveralls.io/github/jideajayi11/Fast-Food-Fast?branch=develop)
[![Build Status](https://travis-ci.org/jideajayi11/Fast-Food-Fast.svg?branch=develop)](https://travis-ci.org/jideajayi11/Fast-Food-Fast)
[![Maintainability](https://api.codeclimate.com/v1/badges/e3cc5f29c81fad43b9ad/maintainability)](https://codeclimate.com/github/jideajayi11/Fast-Food-Fast/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e3cc5f29c81fad43b9ad/test_coverage)](https://codeclimate.com/github/jideajayi11/Fast-Food-Fast/test_coverage)


    
### Pivotal Tracker URL
[`https://www.pivotaltracker.com/n/projects/2196582`](https://www.pivotaltracker.com/n/projects/2196582)

### Github Repo
[`https://github.com/jideajayi11/Fast-Food-Fast`](https://github.com/jideajayi11/Fast-Food-Fast)

### UI Template
[`https://jideajayi11.github.io/Fast-Food-Fast/UI/`](https://jideajayi11.github.io/Fast-Food-Fast/UI/)

### API Deployment
[`APIs`](https://fast-food-fast-delivery.herokuapp.com/)

### Hosted Application
[`Goto Application`](https://fast-food-fast-delivery-app.herokuapp.com/)

### API Endpoints

<table>
  <tr>
    <th>HTTP VERB</th>
    <th>ENDPOINT</th>
    <th>FUNCTIONALITY</th>
    <th>REQUEST BODY</th>
  </tr>
	<tr>
		<td>GET</td>
		<td>/api/v1/orders</td>
		<td>Fetch all orders</td>
		<td></td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/api/v1/users/:userId/orders</td>
		<td>Fetch user order history</td>
		<td></td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/api/v1/orders/:orderId</td>
		<td>Fetch an order</td>
		<td></td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/api/v1/orders</td>
		<td>Add an order</td>
		<td>quantity, foodId</td>
	</tr>
	<tr>
		<td>PUT</td>
		<td>/api/v1/orders/:id</td>
		<td>Update an order</td>
		<td>orderStatus</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/api/v1/menu</td>
		<td>Add Menu</td>
		<td>foodDescription, foodPrice, imageURL</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/api/v1/menu</td>
		<td>Fetch all Menu</td>
		<td></td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/api/v1/auth/signup</td>
		<td>Create Account</td>
		<td>fullName, phoneNumber, deliveryAddress, email, password, confirmPassword</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/api/v1/auth/login</td>
		<td>Login</td>
		<td>email, password</td>
	</tr>
</table>


### Technologies
* [Node.js](https://nodejs.org/) - `Runtime Environment`
* [Express](https://expressjs.com/) - `Web Application Framework`
* [NPM](https://www.npmjs.com/) - `Dependency Manager`
* Airbnb - `Coding Style`

### Supporting Packages
* [ESLint](https://eslint.org/) - `Linter Tool`
* [Babel](https://babeljs.io/) - `Transpiles from ES6 to ES5`
* [Mocha](https://mochajs.org/) - `JavaScript Test Framework for API Tests`
* [Chai](http://chaijs.com/) - `TDD/BDD Assertion Library for Node`
* [Istanbul(nyc)](https://istanbul.js.org/) - `Code Coverage Generator`

### Features
#### Orders
* Fetch all Orders
* Fetch an Order
* Add an Order
* Update an Order

### Installation
* git clone
  [`https://github.com/jideajayi11/Fast-Food-Fast`](https://github.com/jideajayi11/Fast-Food-Fast)
* Run `npm install` to install packages
* Run `npm start` to start the server
* Navigate to [localhost:3000](http://localhost:3000/) in browser to access the
  application

### Tests
* Run `npm run test`

### Author
* Jide Ajayi

## License
This project is licensed under the Apache License - see the [LICENSE](LICENSE) file for details