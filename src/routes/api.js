import { Router } from 'express';
import usersRouters from './users-routes-api';
import doctorsRouters from './doctors-routes-api';
import adminRouters from './admin-routes.api';

const routes = Router();

routes.use('/app', usersRouters);
routes.use('/web', doctorsRouters);
routes.use('/admin', adminRouters);

export default routes;
