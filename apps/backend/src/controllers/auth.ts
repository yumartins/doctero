import { ExtendableContext } from 'koa';

// import knex from '../database';

const auth = async (ctx: ExtendableContext, next: () => Promise<void>): Promise<void> => {
  await next();

  const {
    email,
    password,
  } = ctx.request.body;

  if (! email) ctx.throw(422, 'Email required.');
  if (! password) ctx.throw(422, 'Password required.');

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
