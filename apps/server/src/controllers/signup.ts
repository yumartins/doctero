import { bcrypt, remove } from '@core/helpers';
import { Context } from 'koa';

import knex from '../database';

const signup = async (ctx: Context, next: () => Promise<void>): Promise<void> => {
  await next();

  const {
    name,
    email,
    phone,
    company,
    birthday,
    document,
    password,
  } = ctx.request.body;

  const hash = await bcrypt.hash(password);

  const created = await knex('users').where({ email }).orWhere({ document });

  /**
   * Checks if the email or document is
   * already registered in the database.
   */
  created.map((us) => {
    if (us.email === email) ctx.throw(400, 'Registered user.');
    if (us.document === document) ctx.throw(400, 'Registered document.');

    return null;
  });
  /**
   * Company required.
   */
  if (! company) ctx.throw(400, 'Company name is required.');

  /**
   * Required document.
   */
  if (! document) ctx.throw(400, 'The document is required (CPF or CNPJ).');

  await knex('users')
    .insert({
      name,
      email,
      phone,
      company,
      role_id: 2,
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
