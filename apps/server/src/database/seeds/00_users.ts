import { bcrypt } from '@core/helpers';
import * as Knex from 'knex';

exports.seed = async (knex: Knex): Promise<void> => {
  await knex('users').del();

  await knex('users').insert([
    {
      name: 'yumartins',
      email: 'yumartins@email.com',
      role_id: 2,
      password: await bcrypt.hash('123456'),
    },
  ]);
};
