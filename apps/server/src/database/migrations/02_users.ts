import * as Knex from 'knex';

import knexfile from '../../../knexfile';

exports.up = async (knex: Knex): Promise<void> => knex.schema.createTable('users', (table) => {
  table.increments('id').primary();

  table.text('name').notNullable();
  table.text('email').unique().notNullable();

  table.text('company');
  table.text('document').unique().notNullable();

  table.text('phone');
  table.date('birthday');
  table.text('password').notNullable();

  table.integer('role_id').references('roles.id');
  table.integer('company_id').references('users.id');

  table.timestamps(true, true);
})
  .then(() => knex.raw(knexfile.updated('users')));

exports.down = async (knex: Knex): Promise<void> => knex.schema.dropTable('users');
