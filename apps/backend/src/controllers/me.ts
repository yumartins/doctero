import { remove } from '@core/helpers';
import { Context } from 'koa';

import knex from '../database';

const me = async (ctx: Context, next: () => Promise<void>): Promise<void> => {
  await next();

  const { user } = ctx.state;

  const logged = await knex('users').where({ ...user }).first();

  ctx.status = 200;

  ctx.body = remove('password', logged);
};

export default me;
