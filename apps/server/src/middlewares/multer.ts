import multer from '@koa/multer';
import { Context } from 'koa';

import { limits, storage } from '../configs';

const upload = async (_: Context, next: () => Promise<void>): Promise<void> => {
  multer({ storage, limits }).single('attachment');

  return next();
};

export default upload;
