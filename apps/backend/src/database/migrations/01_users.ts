import * as Knex from 'knex';

import knexfile from '../../../knexfile';

exports.up = async (knex: Knex): Promise<void> => knex.schema.createTable('users', (table) => {
  table.increments('id');
  table.text('name').unique().notNullable();

  table.timestamps(true, true);
})
  .then(() => knex.raw(knexfile.updated('users')));

exports.down = async (knex: Knex): Promise<void> => knex.schema.dropTable('users');
