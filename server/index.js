import express from 'express';
import * as http from 'http';
import bodyParser from 'body-parser';
import logger from 'morgan';
import env from 'dotenv';
import cors from 'cors';
import orderRoute from './routes/orderRoute';
import authRoute from './routes/authRoute';
import foodRoute from './routes/foodRoute';
import apiDoc from './helpers/swagger';

env.config();


const port = process.env.PORT || 3000;
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.get('/', (req, res) => res.status(200).send({
  message: 'Fast-Food-Fast is a food delivery '
  + 'service app for restaurants',
}));
apiDoc(app);
authRoute(app);
orderRoute(app);
foodRoute(app);
app.use((err, req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'Something is not right!',
  });
});

app.set('port', port);
const server = http.createServer(app);
server.listen(port);

export default server;
