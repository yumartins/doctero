import { bcrypt, remove } from '@core/helpers';
import { User } from '@types';
import { Context } from 'koa';

import knex from '../database';

const users = {
  list: async (ctx: Context): Promise<void> => {
    const {
      id,
      company_id,
    } = ctx.state.user as User;

    await knex('users')
      .where({ company_id: company_id || id })
      .returning('*')
      .then((us) => {
        const usered = us.map(({ password, ...rest }) => rest);

        ctx.body = usered;
      });
  },

  show: async (ctx: Context): Promise<void> => {
    const {
      id,
    } = ctx.params;

    const logged = await knex<User>('users').where({ id }).first();

    ctx.body = remove('password', logged || {});
  },

  create: async (ctx: Context): Promise<void> => {
    const {
      id,
    } = ctx.state.user as User;

    const {
      name,
      email,
      phone,
      address,
      role_id,
      birthday,
      document,
      password,
    } = ctx.request.body as User;

    const hash = await bcrypt.hash(password);

    const created = await knex<User>('users').where({ email }).orWhere({ document });

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
        address,
        role_id,
        document,
        birthday,
        password: hash,
        company_id: id,
      })
      .returning('*')
      .then((us) => {
        ctx.body = remove('password', us[0]);

        ctx.status = 201;
      });
  },

  update: async (ctx: Context): Promise<void> => {
    const {
      id,
    } = ctx.params;

    const {
      name,
      email,
      phone,
      address,
      role_id,
      password,
      birthday,
    } = ctx.request.body as User;

    const created = await knex<User>('users').where({ id }).first();
    const database = email ? await knex<User>('users').where({ email }).first() : null;

    if (email === database?.email && email !== created?.email) ctx.throw(400, 'Registered user.');

    const hash = password ? await bcrypt.hash(password) : created?.password;

    await knex('users')
      .update({
        name,
        email,
        phone,
        address,
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

  delete: async (ctx: Context): Promise<void> => {
    const {
      id,
    } = ctx.params;

    const user = await knex<User>('users').where({ id }).first();

    if (user?.company_id === null) ctx.throw(400, 'This user cannot be deleted.');

    await knex('users')
      .where({ id })
      .del();

    ctx.status = 200;
  },
};

export default users;
