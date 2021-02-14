import { Context } from 'koa';

import knex from '../database';
import { unlink, attachment } from '../helpers';

const clients = {
  list: async (ctx: Context): Promise<void> => {
    const {
      user,
    } = ctx.state;

    const {
      id,
      company_id,
    } = user;

    await knex('clients')
      .where({ company_id: company_id || id })
      .returning('*')
      .then((us) => {
        const users = us?.map((item) => ({
          ...item,
          avatar: item?.avatar ? attachment(item.avatar) : null,
        }));

        ctx.body = users;
      });
  },

  show: async (ctx: Context, next: () => Promise<void>): Promise<void> => {
    await next();

    const {
      id,
    } = ctx.params;

    const product = await knex('clients').where({ id }).first();

    ctx.body = {
      ...product,
      avatar: product?.avatar ? attachment(product.avatar) : null,
    };
  },

  media: async (ctx: Context, next: () => Promise<void>): Promise<void> => {
    await next();

    const {
      id,
    } = ctx.params;

    /**
     * Check if you are sending an attachment.
     */
    if (! ctx.file) ctx.throw(400, 'Send an attachment.');

    await knex('clients')
      .update({
        avatar: ctx.file.filename,
      })
      .where({ id });

    ctx.status = 200;
  },

  create: async (ctx: Context, next: () => Promise<void>): Promise<void> => {
    await next();

    const {
      user,
    } = ctx.state;

    const {
      type,
    } = ctx.query;

    const {
      id,
      company_id,
    } = user;

    const {
      name,
      note,
      email,
      phone,
      address,
      company,
      document,
      birthday,
    } = ctx.request.body;

    /**
     * Required.
     */
    if (! name) ctx.throw(400, 'Name is required.');
    if (! email) ctx.throw(400, 'The email is required.');
    if (! document) ctx.throw(400, 'The document is required.');

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

    await knex('clients')
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
    } = ctx.request.body;

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
