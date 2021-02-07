import Router from '@koa/router';
import { DefaultState, Context } from 'koa';

import { auth, users } from './controllers';

const router = new Router<DefaultState, Context>();

router.post('/auth', auth);

router.get('/users', users.list);
router.post('/users', users.create);
router.put('/users/:id', users.update);
router.delete('/users/:id', users.delete);

export default router;
