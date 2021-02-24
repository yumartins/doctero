import cors from '@koa/cors';
import dotenv from 'dotenv';
import Koa from 'koa';
import paser from 'koa-bodyparser';
import policy from 'koa-csp';
import helmet from 'koa-helmet';
import mount from 'koa-mount';
import serve from 'koa-static';
import { koaSwagger } from 'koa2-swagger-ui';
import { join } from 'path';

import { errors } from './middlewares';
import router from './routes';

dotenv.config({ path: join(__dirname, '../../../.env') });

const app = new Koa();

app
  .use(cors())
  .use(helmet())
  .use(errors)
  .use(paser({ jsonLimit: '2mb' }))
  .use(mount('/attachments', serve('./uploads')))
  .use(policy({ enableWarn: false, 'default-src': ['self'] }))
  .use(koaSwagger({
    routePrefix: '/api/docs',
    swaggerOptions: {
      url: `${process.env.API_URL}/api/docs/swagger-json`,
    },
  }))
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(process.env.PORT || 3333);
