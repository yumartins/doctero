import cors from '@koa/cors';
import Koa from 'koa';

import { errors } from './middlewares';
import router from './routes';

const app = new Koa();

app.use(cors());
app.use(errors);
app.use(router.routes());

app.listen(3000);
