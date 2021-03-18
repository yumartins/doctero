import { Service, Product } from '@types';
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

    const typed = type as string;

    await knex(types[typed])
      .where({ company_id: company_id || id })
      .returning('*')
      .then((us) => {
        ctx.body = us;
      });
  },

  show: async (ctx: Context, next: () => Promise<void>): Promise<void> => {
    await next();

    const {
      id,
    } = ctx.params;

    const {
      type,
    } = ctx.query;

    const typed = type as string;

    const product = await knex(types[typed]).where({ id }).first();

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
    } = ctx.request.body as Product;

    if (! name) ctx.throw(400, 'Name is required.');

    if (! sale_price) ctx.throw(400, 'Sale price is required.');

    if (type === 'SERVICES') {
      await knex<Service>('services')
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
      await knex<Product>('products')
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
      type,
    } = ctx.query;

    const {
      id,
    } = ctx.params;

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
    } = ctx.request.body as Product;

    if (type === 'SERVICES') {
      await knex<Service>('services')
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
      await knex<Product>('products')
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
      type,
    } = ctx.query;

    const typed = type as string;

    const {
      id,
    } = ctx.params;

    await knex(types[typed])
      .where({ id })
      .del();

    ctx.status = 200;
  },
};

export default products;
