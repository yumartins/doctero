import * as Knex from 'knex';

import knexfile from '../../../knexfile';

exports.up = async (knex: Knex): Promise<void> => knex.schema.createTable('clients', (table) => {
  table.increments('id').primary();

  table.text('name').notNullable();
  table.text('email').unique().notNullable();

  table.text('company');
  table.text('document').unique().notNullable();

  table.text('type');
  table.text('note');
  table.text('phone');
  table.text('address');
  table.date('birthday');

  table.integer('company_id').references('users.id');

  table.timestamps(true, true);
})
  .then(() => knex.raw(knexfile.updated('clients')));

exports.down = async (knex: Knex): Promise<void> => knex.schema.dropTable('clients');
