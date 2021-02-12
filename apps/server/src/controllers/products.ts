import { Context } from 'koa';

import knex from '../database';

const types = {
  SERVICES: 'services',
  PRODUCTS: 'products',
};

const products = {
  list: async (ctx: Context): Promise<void> => {
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

    if (! type || ! types[type]) ctx.throw(400, 'Please enter a valid type.');

    await knex(types[type])
      .where({ company_id: company_id || id })
      .returning('*')
      .then((us) => {
        ctx.body = us;
      });
  },

  show: async (ctx: Context, next: () => Promise<void>): Promise<void> => {
    await next();

    const {
      user,
    } = ctx.state;

    const {
      id,
    } = ctx.params;

    const {
      type,
    } = ctx.query;

    const {
      role_id,
    } = user;

    if (! type || ! types[type]) ctx.throw(400, 'Please enter a valid type.');

    if (role_id === 2) ctx.throw(400, 'You are not allowed to access this information.');

    const product = await knex(types[type]).where({ id }).first();

    ctx.body = product;
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
      role_id,
      company_id,
    } = user;

    const {
      sku,
      name,
      brand,
      unity,
      photos,
      min_stock,
      max_stock,
      cost_price,
      sale_price,
      description,
      inital_stock,
    } = ctx.request.body;

    if (! name) ctx.throw(400, 'Name is required.');

    if (! sale_price) ctx.throw(400, 'Sale price is required.');

    if (! type || ! types[type]) ctx.throw(400, 'Please enter a valid type.');

    if (role_id === 2) ctx.throw(400, 'You are not allowed to access this information.');

    if (type === 'SERVICES') {
      await knex('services')
        .insert({
          sku,
          name,
          sale_price,
          description,
          company_id: company_id || id,
        })
        .returning('*')
        .then((us) => {
          const usr = us[0];

          ctx.body = usr;

          ctx.status = 201;
        });
    }

    if (type === 'PRODUCTS') {
      await knex('products')
        .insert({
          sku,
          name,
          brand,
          unity,
          photos,
          min_stock,
          max_stock,
          cost_price,
          sale_price,
          description,
          inital_stock,
          company_id: company_id || id,
        })
        .returning('*')
        .then((us) => {
          const usr = us[0];

          ctx.body = usr;

          ctx.status = 201;
        });
    }
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
    } = ctx.params;

    const {
      role_id,
    } = user;

    const {
      sku,
      name,
      brand,
      unity,
      photos,
      min_stock,
      max_stock,
      cost_price,
      sale_price,
      description,
      inital_stock,
    } = ctx.request.body;

    if (! type || ! types[type]) ctx.throw(400, 'Please enter a valid type.');

    if (role_id === 2) ctx.throw(400, 'You are not allowed to access this information.');

    if (type === 'SERVICES') {
      await knex('services')
        .update({
          sku,
          name,
          sale_price,
          description,
        })
        .where({ id })
        .returning('*')
        .then((us) => {
          const usr = us[0];

          ctx.body = usr;

          ctx.status = 201;
        });
    }

    if (type === 'PRODUCTS') {
      await knex('products')
        .update({
          sku,
          name,
          brand,
          unity,
          photos,
          min_stock,
          max_stock,
          cost_price,
          sale_price,
          description,
          inital_stock,
        })
        .where({ id })
        .returning('*')
        .then((us) => {
          const usr = us[0];

          ctx.body = usr;

          ctx.status = 201;
        });
    }
  },

  delete: async (ctx: Context, next: () => Promise<void>): Promise<void> => {
    await next();

    const {
      user,
    } = ctx.state;

    const {
      type,
    } = ctx.query;

    const {
      id,
    } = ctx.params;

    const {
      role_id,
    } = user;

    if (! type || ! types[type]) ctx.throw(400, 'Please enter a valid type.');

    if (role_id === 2) ctx.throw(400, 'You are not allowed to access this information.');

    await knex(types[type])
      .where({ id })
      .del();

    ctx.status = 200;
  },
};

export default products;
