import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authProvider from '../providers/auth-provider';

export default (provider) => async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'token not provider' });
  }
  const [, token] = authHeader.split(' ');
  if (!token) {
    return res.status(401).json({ message: 'token invalid' });
  }
  try {
    const { id } = await promisify(jwt.verify)(token, authProvider[provider].secret);
    req.auth = await authProvider[provider].model.findOne({ wherede: { id } });
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'token invalid' });
  }
};
