import cors from '@koa/cors';
import dotenv from 'dotenv';
import Koa from 'koa';
import paser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import { join } from 'path';

import { errors } from './middlewares';
import router from './routes';

dotenv.config({ path: join(__dirname, '../../../.env') });

const app = new Koa();

app.use(cors());
app.use(helmet());
app.use(errors);
app.use(paser({ jsonLimit: '2mb' }));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.PORT || 3333);
