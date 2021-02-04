import cors from '@koa/cors';
import Koa from 'koa';

import router from './routes';

const app = new Koa();

app.use(cors());
app.use(router.routes());

app.listen(3000);
