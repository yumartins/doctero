import cors from '@koa/cors';
import dotenv from 'dotenv';
import Koa from 'koa';
import body from 'koa-bodyparser';
import policy from 'koa-csp';
import helmet from 'koa-helmet';
import mount from 'koa-mount';
import serve from 'koa-static';
import { join } from 'path';

import { swagger } from './configs';
import { errors } from './middlewares';
import router from './routes';

dotenv.config({ path: join(__dirname, '../../../.env') });

const app = new Koa();

app.use(cors());
app.use(helmet());
app.use(errors);
app.use(body({ jsonLimit: '2mb' }));
app.use(mount('/attachments', serve('./uploads')));
app.use(policy({ enableWarn: false, 'default-src': ['self'] }));
app.use(swagger);
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
