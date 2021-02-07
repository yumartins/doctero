import { Context } from 'koa';

import { getToken, verifyToken } from '../auth';

/**
 * JWT secret.
 */
const secret = process.env.APP_SECRET || '';

/**
 * Authenticaded Middlewares
 */
const authenticaded = async (ctx: Context, next: () => Promise<void>): Promise<void> => {
  const token = getToken(ctx);

  /**
   * Verify token and set user property in state.
   */
  const decoded = verifyToken(token, secret);

  ctx.state.user = {
    id: decoded.id,
    email: decoded.email,
  };

  return next();
};

export default authenticaded;
