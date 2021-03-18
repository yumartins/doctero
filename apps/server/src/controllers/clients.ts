import { User, Client } from '@types';
import { Context } from 'koa';

import knex from '../database';
import { unlink, attachment } from '../helpers';

const clients = {
  list: async (ctx: Context): Promise<void> => {
    const {
      id,
      company_id,
    } = ctx.state.user as User;

    await knex<Client>('clients')
      .where({ company_id: company_id || id })
      .returning('*')
      .then((us) => {
        const client = us?.map((item) => ({
          ...item,
          avatar: item?.avatar ? attachment(item.avatar) : null,
        }));

        ctx.body = client;
      });
  },

  show: async (ctx: Context): Promise<void> => {
    const {
      id,
    } = ctx.params;

    const client = await knex<Client>('clients').where({ id }).first();

    ctx.body = {
      ...client,
      avatar: client?.avatar ? attachment(client.avatar) : null,
    };
  },

  media: async (ctx: Context): Promise<void> => {
    const {
      id,
    } = ctx.params;

    /**
     * Check if you are sending an attachment.
     */
    if (! ctx.file) ctx.throw(400, 'Send an attachment.');

    await knex<Client>('clients')
      .update({
        avatar: ctx.file.filename,
      })
      .where({ id });

    ctx.status = 200;
  },

  create: async (ctx: Context): Promise<void> => {
    const {
      id,
      company_id,
    } = ctx.state.user as User;

    const {
      type,
      name,
      note,
      email,
      phone,
      address,
      company,
      document,
      birthday,
    } = ctx.request.body as Client;

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

    await knex<Client>('clients')
      .insert({
        type,
        name,
        note,
        email,
        phone,
        address,
        company,
        document,
        birthday,
        company_id: company_id || id,
      })
      .returning('*')
      .then((us) => {
        const usr = us[0];

        ctx.body = usr;

        ctx.status = 201;
      });
  },

  update: async (ctx: Context, next: () => Promise<void>): Promise<void> => {
    await next();

    const {
      user,
    } = ctx.state;

    const {
      type,
    } = ctx.query;

    const {
      id,
    } = user;

    const {
      name,
      note,
      email,
      phone,
      address,
      company,
      birthday,
    } = ctx.request.body as Client;

    const created = await knex('users').where({ email }).first();

    /**
     * Checks if the email is
     * already registered in the database.
     */
    if (created.email === email) ctx.throw(400, 'Registered user.');

    await knex('clients')
      .update({
        type,
        name,
        note,
        email,
        phone,
        address,
        company,
        birthday,
      })
      .where({ id })
      .returning('*')
      .then((us) => {
        const usr = us[0];

        ctx.body = usr;

        ctx.status = 201;
      });
  },

  delete: async (ctx: Context, next: () => Promise<void>): Promise<void> => {
    await next();

    const {
      id,
    } = ctx.params;

    await knex('clients')
      .where({ id })
      .del()
      .returning('avatar')
      .then((us) => unlink(us[0]));

    ctx.status = 200;
  },
};

export default clients;
