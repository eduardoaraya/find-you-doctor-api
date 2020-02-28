import jwt from 'jsonwebtoken';
import jwtConfig from '../../config/jwt-config';

import Doctors from '../models/Doctors';
import Users from '../models/Users';
import Admins from '../models/Admins';

export default {
  doctor: {
    model: Doctors,
    gen_token: ({ id }) => jwt.sign({ id }, jwtConfig.doctor.secret, {
      expiresIn: jwtConfig.doctor.expiresIn,
    }),
    secret: jwtConfig.doctor.secret,
  },
  user: {
    modelName: Users,
    gen_token: ({ id }) => jwt.sign({ id }, jwtConfig.user.secret, {
      expiresIn: jwtConfig.user.expiresIn,
    }),
    secret: jwtConfig.user.secret,
  },
  admin: {
    modelName: Admins,
    gen_token: ({ id }) => jwt.sign({ id }, jwtConfig.admin.secret, {
      expiresIn: jwtConfig.admin.expiresIn,
    }),
    secret: jwtConfig.admin.secret,
  },
};
