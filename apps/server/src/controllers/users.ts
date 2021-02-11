import { bcrypt, remove } from '@core/helpers';
import { Context } from 'koa';

import knex from '../database';

const users = {
  list: async (ctx: Context): Promise<void> => {
    const {
      user,
    } = ctx.state;

    await knex('users')
      .where({ company_id: user.company_id || user.id })
      .returning('*')
      .then((us) => {
        const usered = us.map(({ password, ...rest }) => rest);

        ctx.body = usered;
      });
  },

  show: async (ctx: Context, next: () => Promise<void>): Promise<void> => {
    await next();

    const {
      id,
    } = ctx.params;

    const logged = await knex('users').where({ id }).first();

    ctx.body = remove('password', logged);
  },

  create: async (ctx: Context, next: () => Promise<void>): Promise<void> => {
    await next();

    const {
      user,
    } = ctx.state;

    const {
      name,
      email,
      phone,
      role_id,
      birthday,
      document,
      password,
    } = ctx.request.body;

    /**
     * Required email.
     */
    if (! email) ctx.throw(400, 'The email is required.');

    /**
     * Required document.
     */
    if (! document) ctx.throw(400, 'The document is required (CPF or CNPJ).');

    const hash = await bcrypt.hash(password);

    const created = await knex('users').where({ email }).orWhere({ document });

    /**
     * Checks if the email or document is
     * already registered in the database.
     */
    created.map((us) => {
      if (us.email === email) ctx.throw(400, 'Registered user.');
      if (us.document === document) ctx.throw(400, 'Registered document.');

      return null;
    });

    await knex('users')
      .insert({
        name,
        email,
        phone,
        role_id: role_id || 1,
        document,
        birthday,
        password: hash,
        company_id: user.id,
      })
      .returning('*')
      .then((us) => {
        ctx.body = remove('password', us[0]);

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
      phone,
      role_id,
      password,
      birthday,
    } = ctx.request.body;

    const created = await knex('users').where({ id }).first();
    const database = email && await knex('users').where({ email }).first();

    if (email === database?.email && email !== created.email) ctx.throw(400, 'Registered user.');

    const hash = password ? await bcrypt.hash(password) : created.password;

    await knex('users')
      .update({
        name,
        email,
        phone,
        role_id,
        birthday,
        password: hash,
      })
      .where({ id })
      .returning('*')
      .then((us) => {
        ctx.body = remove('password', us[0]);
      });
  },

  delete: async (ctx: Context, next: () => Promise<void>): Promise<void> => {
    await next();

    const {
      id,
    } = ctx.params;

    const user = await knex('users').where({ id }).first();

    if (user.company_id === null) ctx.throw(400, 'This user cannot be deleted.');

    await knex('users')
      .where({ id })
      .del();

    ctx.status = 200;
  },
};

export default users;
