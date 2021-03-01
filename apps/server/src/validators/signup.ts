import { Context } from 'koa';
import * as Yup from 'yup';

import { validation } from '../helpers';

const signup = async (ctx: Context, next: () => Promise<void>): Promise<void> => {
  const schema = {
    email: Yup.string().required('The email is required.'),
    company: Yup.string().required('Company name is required.'),
    password: Yup.string().required('Password is required.'),
    document: Yup.string().required('The document is required (CPF or CNPJ).'),
  };

  await validation(ctx, schema);

  await next();
};

export default signup;
