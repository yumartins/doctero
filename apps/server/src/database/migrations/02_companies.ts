import * as Knex from 'knex';

import knexfile from '../../../knexfile';

exports.up = async (knex: Knex): Promise<void> => knex.schema.createTable('companies', (table) => {
  table.increments('id').primary();

  table.text('name');
  table.text('document').unique().notNullable();

  table.timestamps(true, true);
})
  .then(() => knex.raw(knexfile.updated('companies')));

exports.down = async (knex: Knex): Promise<void> => knex.schema.dropTable('companies');
