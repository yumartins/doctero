import { Context } from 'koa';

/**
 * Products Middlewares
 */
const services = async (ctx: Context, next: () => Promise<void>): Promise<void> => {
  const {
    user,
  } = ctx.state;

  const types = {
    SERVICES: 'services',
    PRODUCTS: 'products',
  };

  const {
    type,
  } = ctx.query;

  const {
    role_id,
  } = user;

  /**
   * Checks if you are receiving the query "type".
   */
  if (! type || ! types[type]) ctx.throw(400, 'Please enter a valid type.');

  /**
   * Only "ADMIN and FINANCIAL" users can create products.
   */
  if (ctx.request.method !== 'GET' && role_id === 2) ctx.throw(400, 'You are not allowed to access this information.');

  return next();
};

export default services;
