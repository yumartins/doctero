import { bcrypt } from '@core/helpers';
import { Context, ExtendableContext } from 'koa';

import knex from '../database';

const users = {
  list: async (ctx: Context): Promise<void> => {
    const res = await knex('users');

    ctx.body = res.map(({
      id,
      name,
      email,
      created_at,
      updated_at,
    }) => ({
      id,
      name,
      email,
      created_at,
      updated_at,
    }));
  },

  create: async (ctx: ExtendableContext, next: () => Promise<void>): Promise<void> => {
    await next();

    const {
      name,
      email,
      password,
    } = ctx.request.body;

    const hash = await bcrypt.hash(password);

    await knex('users')
      .insert({
        name,
        email,
        password: hash,
      })
      .returning('*')
      .then((user) => {
        ctx.body = {
          ...user[0],
          password,
        };

        ctx.status = 201;
      });
  },

  update: async (ctx: Context, next: () => Promise<void>): Promise<void> => {
    await next();

    const {
      id,
    } = ctx.params;

    const {
      name,
    } = ctx.request.body;

    await knex('users')
      .update({ name })
      .where({ id })
      .returning('*')
      .then((user) => {
        ctx.body = { ...user[0] };
      });
  },

  delete: async (ctx: Context, next: () => Promise<void>): Promise<void> => {
    await next();

    const {
      id,
    } = ctx.params;

    await knex('users')
      .where({ id })
      .del();

    ctx.status = 200;
  },
};

export default users;
