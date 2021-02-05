import Router from '@koa/router';
import { DefaultState, Context } from 'koa';

import { users } from './controllers';

const router = new Router<DefaultState, Context>();

router.get('/users', users.list);
router.post('/users', users.create);
router.put('/users/:id', users.update);

export default router;
