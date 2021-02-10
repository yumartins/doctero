import { bcrypt, remove } from '@core/helpers';
import { Context } from 'koa';

import knex from '../database';

const users = {
  list: async (ctx: Context): Promise<void> => {
    const {
      user,
    } = ctx.state;

    await knex('users')
      .where({ father_id: user.id })
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
      role,
    } = ctx.query;

    const {
      name,
      email,
      company,
      birthday,
      document,
      password,
      father_id,
    } = ctx.request.body;

    const hash = await bcrypt.hash(password);

    /**
     * Check if you are sending the query "role".
     */
    if (! role) ctx.throw(400, 'Add the query "role" to define the permission of the created user.');

    const roles = await knex('roles').where({ name: role }).first();
    const logged = await knex('users').where({ email }).orWhere({ document });

    /**
     * Checks if the email or document is
     * already registered in the database.
     */
    const errors = logged.map((user) => ({
      email: user.email === email,
      document: user.document === document,
    }));

    if (errors[0]?.email) ctx.throw(400, 'Registered user.');
    if (errors[0]?.document) ctx.throw(400, 'Registered document.');

    /**
     * Required document.
     */
    if (! document) ctx.throw(400, 'The document is required (CPF or CNPJ).');

    /**
     * Check if you are
     * receiving the "father_id" key.
     */
    if (role !== 'ADMIN' && ! father_id) ctx.throw(400, 'Required father_id.');

    /**
     * Checks if the user "ADMIN"
     * is sending the key "company".
     */
    if (role === 'ADMIN' && ! company) ctx.throw(400, 'Company name is required.');

    await knex('users')
      .insert({
        name,
        email,
        company,
        role_id: roles.id,
        document,
        birthday,
        password: hash,
        father_id,
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
      company,
      password,
      birthday,
    } = ctx.request.body;

    const logged = await knex('users').where({ id }).first();
    const database = await knex('users').where({ email }).first();

    if (email === database.email && ! logged.email) ctx.throw(400, 'Registered user.');

    const hash = password ? await bcrypt.hash(password) : logged.password;

    await knex('users')
      .update({
        name,
        email,
        company,
        birthday,
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
