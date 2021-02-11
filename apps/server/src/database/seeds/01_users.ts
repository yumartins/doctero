import { bcrypt } from '@core/helpers';
import * as Knex from 'knex';

exports.seed = async (knex: Knex): Promise<void> => {
  await knex('users').del();

  await knex('users').insert([
    {
      name: 'Yuri Martins',
      email: 'yuri@estudioflow.com.br',
      company: 'Estúdio Flow',
      role_id: 1,
      document: '08.808.426/0001-45',
      password: await bcrypt.hash('123456'),
    },
  ]);
};
