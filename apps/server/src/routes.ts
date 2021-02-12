import Router from '@koa/router';
import { DefaultState, Context } from 'koa';

import {
  me,
  auth,
  users,
  signup,
  clients,
  products,
} from './controllers';
import {
  roles,
  validations,
  authenticaded,
} from './middlewares';

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
router.get('/users', authenticaded, roles, users.list);
router.post('/users', authenticaded, roles, users.create);
router.get('/users/:id', authenticaded, roles, users.show);
router.put('/users/:id', authenticaded, roles, users.update);
router.delete('/users/:id', authenticaded, roles, users.delete);

/**
 * Clients.
 */
router.get('/clients', authenticaded, clients.list);
router.get('/clients/:id', authenticaded, clients.show);
router.put('/clients/:id', authenticaded, roles, validations, clients.update);
router.post('/clients', authenticaded, roles, validations, clients.create);
router.delete('/clients/:id', authenticaded, roles, validations, clients.delete);

/**
 * Products.
 */
router.get('/products', authenticaded, validations, products.list);
router.get('/products/:id', authenticaded, validations, products.show);
router.put('/products/:id', authenticaded, roles, validations, products.update);
router.post('/products', authenticaded, roles, validations, products.create);
router.delete('/products/:id', authenticaded, roles, validations, products.delete);

export default router;
