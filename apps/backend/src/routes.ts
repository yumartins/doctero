import Router from '@koa/router';
import { DefaultState, Context } from 'koa';

import { me, auth, users } from './controllers';
import { authenticaded } from './middlewares';

const router = new Router<DefaultState, Context>();

router.post('/auth', auth);

router.get('/me', authenticaded, me);

router.post('/users', users.create);
router.get('/users', authenticaded, users.list);
router.get('/users/:id', authenticaded, users.show);
router.put('/users/:id', authenticaded, users.update);
router.delete('/users/:id', authenticaded, users.delete);

export default router;
