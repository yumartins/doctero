import * as Knex from 'knex';

exports.up = async (knex: Knex): Promise<void> => knex.schema.createTable('users', (table) => {
  table.increments('id');
  table.text('name').unique().notNullable();

  table.timestamp('created_at').defaultTo(knex.fn.now());
  table.timestamp('updated_at').defaultTo(knex.fn.now());
});

exports.down = async (knex: Knex): Promise<void> => knex.schema.dropTable('users');
