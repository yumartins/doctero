import { Context } from 'koa';
import * as Yup from 'yup';

import { validation } from '../helpers';

const auth = async (ctx: Context, next: () => Promise<void>): Promise<void> => {
  const schema = {
    email: Yup.string().required('Email required.'),
    password: Yup.string().required('Password required.'),
  };

  await validation(ctx, schema);

  await next();
};

export default auth;
