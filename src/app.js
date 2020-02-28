import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routesApi from './routes/api';

import './config/database/connectionDB';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(cors('*'));
  }

  routes() {
    this.server.use('/api', routesApi);
  }
}
const app = new App().server;
export default app;
