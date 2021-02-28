import { Context } from 'koa';
import * as Yup from 'yup';

type Validation = {
  path: string,
  type: string,
  errors: string[]
};

const validation = async (ctx: Context, schema: Record<string, any>): Promise<void> => {
  await Yup.object()
    .shape(schema)
    .validate(ctx.request.body, {
      abortEarly: false,
    })
    .catch((err: Validation) => ctx.throw(422, `${err.errors?.join(', ') || 'Validation failed'}`));
};

export default validation;
