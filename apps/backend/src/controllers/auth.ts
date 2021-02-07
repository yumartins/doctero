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

  const token = await generate({
    id: user.id,
    email,
    password: user.password,
  });

  console.log(token);

  // await knex('users')
  //   .insert({ name })
  //   .returning('*')
  //   .then((user) => {
  //     ctx.body = { ...user[0] };

  //     ctx.status = 201;
  //   });

  ctx.status = 200;

  ctx.body = {
    email,
    password,
  };
};

export default auth;
