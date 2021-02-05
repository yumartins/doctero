import { Context } from 'koa';

/**
 * Not found middleware.
 */
const handler = async (ctx: Context, next: (err: Error) => Promise<void>): Promise<void> => {
  const error = new Error();

  ctx.status = 404;

  ctx.body = {
    error: 'Not Found',
  };

  next(error);
};

export default handler;
