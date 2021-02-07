import Router from '@koa/router';
import { DefaultState, Context } from 'koa';

import { auth, users } from './controllers';
import { authenticaded } from './middlewares';

const router = new Router<DefaultState, Context>();

router.post('/auth', auth);
router.post('/users', users.create);

router.use(authenticaded);

router.get('/users', users.list);
router.put('/users/:id', users.update);
router.delete('/users/:id', users.delete);

export default router;
