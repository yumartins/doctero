import Router from '@koa/router';

import { users } from './controllers';

const router = new Router();

router.get('/users', users.list);
router.post('/users', users.create);

export default router;
