import cors from '@koa/cors';
import dotenv from 'dotenv';
import Koa from 'koa';
import paser from 'koa-bodyparser';
import convert from 'koa-convert';
import policy from 'koa-csp';
import helmet from 'koa-helmet';
import mount from 'koa-mount';
import serve from 'koa-static';
import { join } from 'path';
import swaggerUi from 'swagger-ui-koa';

import { errors } from './middlewares';
import router from './routes';
import swagger from './swagger';

dotenv.config({ path: join(__dirname, '../../../.env') });

const app = new Koa();

app
  .use(cors())
  .use(helmet())
  .use(errors)
  .use(paser({ jsonLimit: '2mb' }))
  .use(serve(`${__dirname}/assets`))
  .use(policy({ enableWarn: false, 'default-src': ['self'] }))
  .use(swaggerUi.serve)
  .use(convert(mount('/docs', swaggerUi.setup(swagger))))
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(process.env.PORT || 3333);
