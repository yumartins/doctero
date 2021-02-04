import * as Knex from 'knex';

exports.seed = async (knex: Knex): Promise<void> => {
  await knex('users').del();

  await knex('users').insert([
    { name: 'yumartins' },
  ]);
};
