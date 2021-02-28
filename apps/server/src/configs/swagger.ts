import dotenv from 'dotenv';
import { koaSwagger } from 'koa2-swagger-ui';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '../../../../.env') });

const swagger = koaSwagger({
  routePrefix: '/api/docs',
  swaggerOptions: {
    url: `${process.env.API_URL}/api/docs/swagger-json`,
  },
});

export default swagger;
