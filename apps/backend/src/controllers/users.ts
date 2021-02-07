import { bcrypt, remove } from '@core/helpers';
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

    const logged = await knex('users').where({ email }).first();

    if (email === logged.email) {
      ctx.throw(400, 'Registered User');
    }

    await knex('users')
      .insert({
        name,
        email,
        password: hash,
      })
      .returning('*')
      .then((user) => {
        ctx.body = remove('password', user[0]);

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
      email,
      password,
    } = ctx.request.body;

    const logged = await knex('users').where({ id }).first();

    const hash = password ? await bcrypt.hash(password) : logged.password;

    await knex('users')
      .update({
        name,
        email,
        password: hash,
      })
      .where({ id })
      .returning('*')
      .then((user) => {
        ctx.body = remove('password', user[0]);
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
