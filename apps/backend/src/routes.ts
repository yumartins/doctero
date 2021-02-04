import Router from '@koa/router';

import knex from './database';

const router = new Router();

router.get('/users', async (ctx) => {
  const res = await knex('users');

  ctx.body = res;
});

export default router;
