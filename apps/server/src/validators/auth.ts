import { Context } from 'koa';

import { schemas, validation } from '../helpers';

const auth = async (ctx: Context, next: () => Promise<void>): Promise<void> => {
  const {
    email,
    password,
  } = schemas;

  await validation(ctx, { email, password });

  await next();
};

export default auth;
