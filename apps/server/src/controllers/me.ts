import { bcrypt, remove } from '@core/helpers';
import { Context } from 'koa';

import knex from '../database';

const me = {
  show: async (ctx: Context, next: () => Promise<void>): Promise<void> => {
    await next();

    const {
      user,
    } = ctx.state;

    const logged = await knex('users').where({ id: user.id }).first();

    ctx.status = 200;

    ctx.body = remove('password', logged);
  },

  update: async (ctx: Context, next: () => Promise<void>): Promise<void> => {
    await next();

    const {
      user,
    } = ctx.state;

    const {
      name,
      email,
      phone,
      company,
      password,
      birthday,
    } = ctx.request.body;

    if (email) {
      const database = await knex('users').where({ email }).first();

      if (email === database?.email) ctx.throw(400, 'Registered user.');
    }

    const hash = password ? await bcrypt.hash(password) : user.password;

    await knex('users')
      .update({
        name,
        email,
        phone,
        company,
        birthday,
        password: hash,
      })
      .where({ id: user.id })
      .returning('*')
      .then((usered) => {
        ctx.body = remove('password', usered[0]);
      });
  },

  delete: async (ctx: Context, next: () => Promise<void>): Promise<void> => {
    await next();

    const {
      user,
    } = ctx.state;

    const {
      id,
      company_id,
    } = user;

    if (company_id === null) ctx.throw(400, 'This user cannot be deleted.');

    await knex('users')
      .where({ id })
      .del();

    ctx.status = 200;
  },
};

export default me;
