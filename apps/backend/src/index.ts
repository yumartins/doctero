import cors from '@koa/cors';
import Koa from 'koa';
import body from 'koa-bodyparser';

import { errors } from './middlewares';
import router from './routes';

const app = new Koa();

app.use(cors());
app.use(body({
  jsonLimit: '2mb',
}));
app.use(errors);
app.use(router.routes());

app.listen(3000);
