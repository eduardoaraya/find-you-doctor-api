import { Router } from 'express';
import RegisterController from '../app/controllers/users/RegisterController';
import AuthController from '../app/controllers/users/AuthController';

const routes = Router();

routes.post('/store', RegisterController.store);
routes.post('/login', AuthController.auth);

export default routes;
