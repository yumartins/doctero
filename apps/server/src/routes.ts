import Router from '@koa/router';
import { DefaultState, Context } from 'koa';

import {
  me,
  auth,
  users,
  signup,
} from './controllers';
import { authenticaded } from './middlewares';

const router = new Router<DefaultState, Context>();

/**
 * Auth.
 */
router.post('/auth', auth);
router.post('/signup', signup);

/**
 * User logged in.
 */
router.get('/me', authenticaded, me.show);
router.put('/me', authenticaded, me.update);
router.delete('/me', authenticaded, me.delete);

/**
 * Users.
 */
router.post('/users', users.create);
router.get('/users', authenticaded, users.list);
router.get('/users/:id', authenticaded, users.show);
router.put('/users/:id', authenticaded, users.update);
router.delete('/users/:id', authenticaded, users.delete);

export default router;
