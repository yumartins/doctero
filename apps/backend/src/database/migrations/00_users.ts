import * as Knex from 'knex';

export const up = async (knex: Knex): Promise<void> => knex.schema.createTable('users', (table) => {
  table.increments('id');
  table.text('name').unique().notNullable();

  table.timestamp('created_at').defaultTo(knex.fn.now());
  table.timestamp('updated_at').defaultTo(knex.fn.now());
});

export const down = async (knex: Knex): Promise<void> => knex.schema.dropTable('users');
