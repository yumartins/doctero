import Router from '@koa/router';
import { DefaultState, Context } from 'koa';

import {
  me,
  auth,
  users,
  signup,
  products,
} from './controllers';
import { admin, authenticaded } from './middlewares';

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
router.get('/users', authenticaded, users.list);
router.post('/users', authenticaded, admin, users.create);
router.get('/users/:id', authenticaded, users.show);
router.put('/users/:id', authenticaded, admin, users.update);
router.delete('/users/:id', authenticaded, admin, users.delete);

/**
 * Products.
 */
router.get('/products', authenticaded, products.list);
router.get('/products/:id', authenticaded, products.show);
router.put('/products/:id', authenticaded, products.update);
router.post('/products', authenticaded, products.create);
router.delete('/products/:id', authenticaded, products.delete);

export default router;
