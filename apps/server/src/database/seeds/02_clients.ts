import * as Knex from 'knex';

exports.seed = async (knex: Knex): Promise<void> => {
  await knex('clients').del();

  await knex('clients').insert([
    {
      type: 'CLIENT',
      name: 'Raquel Prado',
      email: 'raquel@email.com',
      company: 'Kiara',
      document: '08.808.426/0001-44',
      birthday: 'Wed Jul 08 2020 10:17:49',
      company_id: 1,
    },
  ]);
};
