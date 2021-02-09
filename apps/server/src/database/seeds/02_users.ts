import { bcrypt } from '@core/helpers';
import * as Knex from 'knex';

exports.seed = async (knex: Knex): Promise<void> => {
  await knex('users').del();

  await knex('users').insert([
    {
      name: 'Yuri Martins',
      email: 'yuri@estudioflow.com.br',
      role_id: 2,
      document: '121.893.616-99',
      password: await bcrypt.hash('123456'),
      company_id: 1,
    },
  ]);
};
