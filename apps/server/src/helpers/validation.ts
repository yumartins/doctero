import { Context } from 'koa';
import * as Yup from 'yup';

type Validation = {
  path: string,
  type: string,
  errors: string[]
};

const error = (err: Validation): string => (`${err.errors?.join(', ') || 'Validation failed'}`);

const validation = async (ctx: Context, schema: Record<string, any>): Promise<void> => {
  await Yup.object()
    .shape(schema)
    .validate(ctx.request.body, {
      abortEarly: false,
    })
    .catch((err) => ctx.throw(422, error(err)));
};

export default validation;
