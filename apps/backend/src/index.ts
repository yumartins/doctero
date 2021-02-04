import Router from '@koa/router';
import Koa from 'koa';

const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = 'Hello';
});

app.use(router.routes());

app.listen(3000);
