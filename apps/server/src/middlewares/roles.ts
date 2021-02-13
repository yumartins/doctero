import { verify } from '@core/helpers';
import { Context } from 'koa';

/**
 * Products Middlewares
 */
const roles = async (ctx: Context, next: () => Promise<void>): Promise<void> => {
  const {
    user,
  } = ctx.state;

  const {
    role_id,
  } = user;

  /**
   * Only "ADMIN" users can access.
   */
  if (verify(['/users'], ctx.path) && role_id !== 1) ctx.throw(400, 'You are not allowed to access this information.');

  /**
   * Only "ADMIN" and "FINANCIAL" users can access.
   */
  if (verify(['/clients', '/products'], ctx.path) && role_id === 2) ctx.throw(400, 'You are not allowed to access this information.');

  return next();
};

export default roles;
