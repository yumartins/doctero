import { Context } from 'koa';

import swagger from '../docs';

const docs = async (ctx: Context): Promise<void> => {
  ctx.body = swagger;
};

export default docs;
