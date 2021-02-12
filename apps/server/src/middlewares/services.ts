import { Context } from 'koa';

/**
 * Products Middlewares
 */
const services = async (ctx: Context, next: () => Promise<void>): Promise<void> => {
  const types = {
    SERVICES: 'services',
    PRODUCTS: 'products',
  };

  const {
    type,
  } = ctx.query;

  /**
   * Checks if you are receiving the query "type".
   */
  if (! type || ! types[type]) ctx.throw(400, 'Please enter a valid type.');

  return next();
};

export default services;
