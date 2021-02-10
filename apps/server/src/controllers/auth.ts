import { bcrypt } from '@core/helpers';
import { ExtendableContext } from 'koa';

import { generate } from '../auth';
import knex from '../database';

const auth = async (ctx: ExtendableContext, next: () => Promise<void>): Promise<void> => {
  await next();

  const {
    email,
    password,
  } = ctx.request.body;

  if (! email) ctx.throw(422, 'Email required.');
  if (! password) ctx.throw(422, 'Password required.');

  const user = await knex('users').where({ email }).first();

  if (! user) ctx.throw(401, 'Unregistered email.');

  const match = await bcrypt.compare(password, user.password);

  if (! match) ctx.throw(401, 'Incorrect password.');

  const token = generate({
    id: user.id,
    email,
    father_id: user.father_id,
  });

  ctx.status = 200;

  ctx.body = {
    token,
  };
};

export default auth;
