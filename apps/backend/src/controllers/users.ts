import { Context } from 'koa';

import knex from '../database';

const users = {
  list: async (ctx: Context): Promise<void> => {
    const res = await knex('users');

    ctx.body = res;
  },

  create: async (ctx: Context, next: () => Promise<void>): Promise<void> => {
    await next();

    console.log(ctx.request);

    // await knex('users').insert({
    //   username,
    // });

    ctx.status = 201;
  },
};

export default users;
