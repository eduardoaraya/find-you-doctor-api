import { Router } from 'express';
import multer from 'multer';
import RegisterController from '../app/controllers/doctors/RegisterController';
import AuthController from '../app/controllers/doctors/AuthController';
import DoctorController from '../app/controllers/doctors/DoctorController';

import authMiddleware from '../app/middlewares/auth-middleware';

import multerConfig from '../config/multer-config';

const routes = Router();

routes.post('/store', multer(multerConfig).single('picture'), RegisterController.store);
routes.get('/store/validation', RegisterController.validationStep);
routes.post('/login', AuthController.auth);
routes.put('/update', authMiddleware('doctor'), DoctorController.update);

export default routes;
