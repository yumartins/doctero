import { Context } from 'koa';
import * as Yup from 'yup';

import { validation } from '../helpers';

const users = async (ctx: Context, next: () => Promise<void>): Promise<void> => {
  const schema = {
    email: Yup.string().required('The email is required.'),
    role_id: Yup.number().required('Permission is mandatory.'),
    document: Yup.string().required('Document is required.'),
  };

  await validation(ctx, schema);

  await next();
};

export default users;
