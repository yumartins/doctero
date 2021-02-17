import multer from '@koa/multer';
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
import { limits, storage } from './helpers';
import {
  roles,
  validations,
  authenticated,
} from './middlewares';

const router = new Router<DefaultState, Context>();

const upload = multer({ storage, limits }).single('attachment');

/**
 * Auth.
 */
router.post('/auth', auth);
router.post('/signup', signup);

/**
 * User logged in.
 */
router.get('/me', authenticated, me.show);
router.put('/me', authenticated, me.update);
router.post('/me/media', authenticated, upload, me.media);
router.delete('/me', authenticated, me.delete);

/**
 * Users.
 */
router.get('/users', authenticated, roles, users.list);
router.post('/users', authenticated, roles, users.create);
router.get('/users/:id', authenticated, roles, users.show);
router.put('/users/:id', authenticated, roles, users.update);
router.delete('/users/:id', authenticated, roles, users.delete);

/**
 * Clients.
 */
router.get('/clients', authenticated, clients.list);
router.get('/clients/:id', authenticated, clients.show);
router.put('/clients/:id', authenticated, roles, validations, clients.update);
router.post('/clients', authenticated, roles, validations, clients.create);
router.post('/clients/:id/media', authenticated, roles, upload, clients.media);
router.delete('/clients/:id', authenticated, roles, clients.delete);

/**
 * Products.
 */
router.get('/products', authenticated, validations, products.list);
router.get('/products/:id', authenticated, validations, products.show);
router.put('/products/:id', authenticated, roles, validations, products.update);
router.post('/products', authenticated, roles, validations, products.create);
router.delete('/products/:id', authenticated, roles, validations, products.delete);

export default router;
