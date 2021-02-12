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
import { admin, services, authenticaded } from './middlewares';

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
 * Clients.
 */
router.get('/clients', authenticaded, clients.list);
router.get('/clients/:id', authenticaded, clients.show);
router.put('/clients/:id', authenticaded, clients.update);
router.post('/clients', authenticaded, clients.create);
router.delete('/clients/:id', authenticaded, clients.delete);

/**
 * Products.
 */
router.get('/products', authenticaded, services, products.list);
router.get('/products/:id', authenticaded, services, products.show);
router.put('/products/:id', authenticaded, services, products.update);
router.post('/products', authenticaded, services, products.create);
router.delete('/products/:id', authenticaded, services, products.delete);

export default router;
