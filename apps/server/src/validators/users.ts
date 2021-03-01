import { Context } from 'koa';

import { schemas, validation } from '../helpers';

const users = async (ctx: Context, next: () => Promise<void>): Promise<void> => {
  const {
    email,
    role_id,
    document,
    password,
  } = schemas;

  await validation(ctx, {
    email,
    role_id,
    document,
    password,
  });

  await next();
};

export default users;
