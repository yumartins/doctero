import { Context } from 'koa';

import knex from '../database';

const users = async (ctx: Context): Promise<void> => {
  const res = await knex('users');

  ctx.body = res;
};

export default users;
