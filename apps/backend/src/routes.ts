import Router from '@koa/router';

import { users } from './controllers';

const router = new Router();

router.get('/users', users);

export default router;
