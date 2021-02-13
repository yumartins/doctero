import 'dotenv/config';
import cors from '@koa/cors';
import Koa from 'koa';
import paser from 'koa-bodyparser';
import helmet from 'koa-helmet';

import { errors } from './middlewares';
import router from './routes';

const app = new Koa();

app.use(cors());
app.use(helmet());
app.use(errors);
app.use(paser({ jsonLimit: '2mb' }));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3333);
