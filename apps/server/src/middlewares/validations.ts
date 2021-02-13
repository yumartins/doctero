import { Context } from 'koa';

/**
 * Products Middlewares
 */
const validations = async (ctx: Context, next: () => Promise<void>): Promise<void> => {
  const {
    type,
  } = ctx.query;

  const clients = {
    BOTH: 'BOTH',
    CLIENT: 'CLIENT',
    PROVIDER: 'PROVIDER',
  };

  const services = {
    SERVICES: 'services',
    PRODUCTS: 'products',
  };

  /**
   * Checks if you are receiving the query "type".
   */
  if (! type || (! clients[type[0]] && ! services[type[0]])) ctx.throw(400, 'Please enter a valid type.');

  return next();
};

export default validations;
