import { Context } from 'koa';

/**
 * Error handler middleware.
 */
const handler = async (ctx: Context, next: () => Promise<void>): Promise<void> => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;

    ctx.body = {
      message: ctx.status === 500
        ? 'Internal Server Error'
        : ctx.body || err.message,
    };

    ctx.app.emit('error', err, ctx);
  }
};

export default handler;
