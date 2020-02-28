import { Router } from 'express';
import AuthController from '../app/controllers/admin/AuthController';

const routes = Router();

routes.post('/login', AuthController.auth);

export default routes;
