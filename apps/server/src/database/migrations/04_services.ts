import { Knex } from 'knex';

import knexfile from '../../../knexfile';

exports.up = async (knex: Knex): Promise<void> => knex.schema.createTable('services', (table) => {
  table.increments('id').primary();

  table.text('sku');
  table.text('name').notNullable();
  table.text('description');

  table.float('sale_price').notNullable();

  table.integer('company_id').references('users.id');

  table.timestamps(true, true);
})
  .then(() => knex.raw(knexfile.updated('services')));

exports.down = async (knex: Knex): Promise<void> => knex.schema.dropTable('services');
