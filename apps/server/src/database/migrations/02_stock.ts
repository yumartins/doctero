import * as Knex from 'knex';

import knexfile from '../../../knexfile';

exports.up = async (knex: Knex): Promise<void> => knex.schema.createTable('stock', (table) => {
  table.increments('id').primary();
  table.text('name').notNullable();
  table.float('price').notNullable();
  table.integer('amount').notNullable();

  table.integer('user_id').references('users.id').notNullable().onDelete('CASCADE');

  table.timestamps(true, true);
})
  .then(() => knex.raw(knexfile.updated('stock')));

exports.down = async (knex: Knex): Promise<void> => knex.schema.dropTable('stock');
