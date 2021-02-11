import { Context } from 'koa';

/**
 * Admin Middlewares
 */
const admin = async (ctx: Context, next: () => Promise<void>): Promise<void> => {
  const {
    user,
  } = ctx.state;

  /**
   * Only "ADMIN" users can create accounts.
   */
  if (user.company_id !== null) ctx.throw(400, 'Only "ADMIN" users can create accounts.');

  return next();
};

export default admin;
