import express from 'express';
import * as http from 'http';
import bodyParser from 'body-parser';
import logger from 'morgan';
import env from 'dotenv';
import orderRoute from './routes/orderRoute';
import authRoute from './routes/authRoute';
import foodRoute from './routes/foodRoute';
import verifyToken from './helpers/verifyToken';

env.config();

const port = process.env.PORT || 3000;
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.status(200).send({
  message: 'Fast-Food-Fast is a food delivery '
  + 'service app for restaurants',
}));

authRoute(app);
app.use(verifyToken);
foodRoute(app);
orderRoute(app);

app.set('port', port);
const server = http.createServer(app);
server.listen(port);
console.log('connected to port');

export default server;
