import * as Knex from 'knex';

import knexfile from '../../../knexfile';

exports.up = async (knex: Knex): Promise<void> => knex.schema.createTable('attachments', (table) => {
  table.increments('id').primary();

  table.text('name').notNullable();

  table.text('type').notNullable();
  table.text('path').notNullable();

  table.integer('user_id').references('users.id');
  table.integer('product_id').references('products.id');

  table.timestamps(true, true);
})
  .then(() => knex.raw(knexfile.updated('attachments')));

exports.down = async (knex: Knex): Promise<void> => knex.schema.dropTable('attachments');
