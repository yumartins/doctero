import { Context, ExtendableContext } from 'koa';

import knex from '../database';

const users = {
  list: async (ctx: Context): Promise<void> => {
    const res = await knex('users');

    ctx.body = res;
  },

  create: async (ctx: ExtendableContext, next: () => Promise<void>): Promise<void> => {
    await next();

    const {
      name,
    } = ctx.request.body;

    await knex('users')
      .insert({ name })
      .returning('*')
      .then((user) => {
        ctx.body = {
          ...user[0],
        };

        ctx.status = 201;
      });
  },
};

export default users;
