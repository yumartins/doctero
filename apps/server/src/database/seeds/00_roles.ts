import * as Knex from 'knex';

exports.seed = async (knex: Knex): Promise<void> => {
  await knex('roles').del();

  await knex('roles').insert([
    { name: 'USER' },
    { name: 'ADMIN' },
    { name: 'FINANCIAL' },
  ]);
};
