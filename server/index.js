import express from 'express';
import * as http from 'http';
import bodyParser from 'body-parser';
import logger from 'morgan';
import env from 'dotenv';
import orderRoute from './routes/orderRoute';
import authRoute from './routes/authRoute';
import foodRoute from './routes/foodRoute';

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
orderRoute(app);
foodRoute(app);
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something is not right!',
  });
});

app.set('port', port);
const server = http.createServer(app);
server.listen(port);
console.log('connected to port');

export default server;
