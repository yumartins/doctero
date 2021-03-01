import { bcrypt, remove } from '@core/helpers';
import { User } from '@types';
import { Context } from 'koa';

import knex from '../database';

const signup = async (ctx: Context): Promise<void> => {
  const {
    name,
    email,
    phone,
    address,
    company,
    birthday,
    document,
    password,
  } = ctx.request.body as User;

  const hash = await bcrypt.hash(password);

  const created = await knex<User>('users').where({ email }).orWhere({ document });

  /**
   * Checks if the email or document is
   * already registered in the database.
   */
  created?.map((us) => {
    if (us.email === email) ctx.throw(400, 'Registered user.');
    if (us.document === document) ctx.throw(400, 'Registered document.');

    return null;
  });

  await knex('users')
    .insert({
      name,
      email,
      phone,
      address,
      company,
      role_id: 1,
      document,
      birthday,
      password: hash,
    })
    .returning('*')
    .then((user) => {
      ctx.body = remove('password', user[0]);

      ctx.status = 201;
    });
};

export default signup;
