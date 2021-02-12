import * as Knex from 'knex';

import knexfile from '../../../knexfile';

exports.up = async (knex: Knex): Promise<void> => knex.schema.createTable('products', (table) => {
  table.increments('id').primary();

  table.text('sku');
  table.text('name').notNullable();
  table.text('brand');

  table.text('unity');
  table.text('photos');
  table.text('description');

  table.integer('min_stock').notNullable();
  table.integer('max_stock').notNullable();
  table.integer('inital_stock').notNullable();

  table.float('cost_price').notNullable();
  table.float('sale_price').notNullable();

  table.integer('company_id').references('users.id');

  table.timestamps(true, true);
})
  .then(() => knex.raw(knexfile.updated('products')));

exports.down = async (knex: Knex): Promise<void> => knex.schema.dropTable('products');
