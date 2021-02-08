import * as Knex from 'knex';

exports.up = async (knex: Knex): Promise<void> => knex.schema.createTable('roles', (table) => {
  table.increments('id').primary();
  table.text('name').notNullable();

  table.timestamp('created_at').defaultTo(knex.fn.now());
});

exports.down = async (knex: Knex): Promise<void> => knex.schema.dropTable('roles');
