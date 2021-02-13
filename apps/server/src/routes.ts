import multer from '@koa/multer';
import Router from '@koa/router';
import { DefaultState, Context } from 'koa';

import {
  // me,
  auth,
  // users,
  signup,
  // clients,
  // products,
} from './controllers';
import { limits, storage } from './helpers';
// import {
//   roles,
//   validations,
// } from './middlewares';

const router = new Router<DefaultState, Context>();

const upload = multer({ storage, limits });

console.log(upload);

/**
 * Auth.
 */
router.post('/auth', auth);
router.post('/signup', signup);

/**
 * User logged in.
 */
// router.get('/me', me.show);
// router.put('/me', me.update);
// router.delete('/me', me.delete);

/**
 * Users.
 */
// router.get('/users', roles, users.list);
// router.post('/users', roles, users.create);
// router.get('/users/:id', roles, users.show);
// router.put('/users/:id', roles, users.update);
// router.delete('/users/:id', roles, users.delete);

/**
 * Clients.
 */
// router.get('/clients', clients.list);
// router.get('/clients/:id', clients.show);
// router.put('/clients/:id', roles, validations, clients.update);
// router.post('/clients', roles, validations, clients.create);
// router.delete('/clients/:id', roles, clients.delete);

/**
 * Products.
 */
// router.get('/products', validations, products.list);
// router.get('/products/:id', validations, products.show);
// router.put('/products/:id', roles, validations, products.update);
// router.post('/products', roles, validations, products.create);
// router.delete('/products/:id', roles, validations, products.delete);

export default router;
