import { bcrypt } from '@core/helpers';
import { Context } from 'koa';

import { generate } from '../auth';
import knex from '../database';

const auth = async (ctx: Context): Promise<void> => {
  const {
    email,
    password,
  } = ctx.request.body;

  const user = await knex('users').where({ email }).first();

  if (! user) ctx.throw(401, 'Unregistered email.');

  const match = await bcrypt.compare(password, user.password);

  if (! match) ctx.throw(401, 'Incorrect password.');

  const token = generate({
    id: user.id,
    email,
    role_id: user.role_id,
    password: user.password,
    company_id: user.company_id,
  });

  ctx.status = 200;

  ctx.body = {
    token,
  };
};

export default auth;
