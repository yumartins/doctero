import multer from '@koa/multer';
import Router from '@koa/router';
import { DefaultState, Context } from 'koa';

import { limits, storage } from './configs';
import {
  me,
  docs,
  auth,
  users,
  signup,
  clients,
  products,
} from './controllers';
import {
  roles,
  validations,
  authenticated,
} from './middlewares';
import {
  vAuth,
} from './validators';

const router = new Router<DefaultState, Context>({ prefix: '/api' });

const upload = multer({ storage, limits }).single('attachment');

/**
 * Swagger.
 */
router.get('/docs/swagger-json', docs);

/**
 * Auth.
 */
router.post('/auth', vAuth, auth);
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
