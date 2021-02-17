import { Context } from 'koa';

import { getToken, verifyToken } from '../auth';

/**
 * JWT secret.
 */
const secret = process.env.APP_SECRET || '';

/**
 * Authenticated Middlewares
 */
const authenticated = async (ctx: Context, next: () => Promise<void>): Promise<void> => {
  const token = getToken(ctx);

  /**
   * Verify token and set user property in state.
   */
  const decoded = verifyToken(token, secret);

  ctx.state.user = decoded;

  return next();
};

export default authenticated;
