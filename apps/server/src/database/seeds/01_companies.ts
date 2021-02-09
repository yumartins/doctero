import * as Knex from 'knex';

exports.seed = async (knex: Knex): Promise<void> => {
  await knex('companies').del();

  await knex('companies').insert([
    {
      name: 'Estúdio Flow',
      document: '81.879.790/0001-29',
    },
  ]);
};
