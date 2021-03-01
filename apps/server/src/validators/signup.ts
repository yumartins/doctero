import { Context } from 'koa';

import { schemas, validation } from '../helpers';

const signup = async (ctx: Context, next: () => Promise<void>): Promise<void> => {
  const {
    email,
    company,
    document,
    password,
  } = schemas;

  await validation(ctx, {
    email,
    company,
    document,
    password,
  });

  await next();
};

export default signup;
