import { Context } from 'koa';

import { schemas, validation } from '../helpers';

const clients = async (ctx: Context, next: () => Promise<void>): Promise<void> => {
  const {
    name,
    email,
    document,
  } = schemas;

  await validation(ctx, {
    name,
    email,
    document,
  });

  await next();
};

export default clients;
