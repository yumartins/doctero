import { Context } from 'koa';

/**
 * Error handler middleware.
 */
const handler = async (ctx: Context, next: () => Promise<void>): Promise<void> => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.status || 500;

    ctx.body = ctx.status === 500
      ? 'Internal Server Error'
      : ctx.body || error.message;

    ctx.app.emit('error', error, ctx);
  }
};

export default handler;
