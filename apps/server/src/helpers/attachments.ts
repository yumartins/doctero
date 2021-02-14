import { diskStorage } from '@koa/multer';
import crypto from 'crypto-js';
import { join } from 'path';

/**
 * Upload file storage path.
 */
export const storage = diskStorage({
  destination(_, __, cb) {
    cb(null, join(__dirname, '../../uploads'));
  },

  filename(_, file, cb) {
    const type = file.originalname.split('.')[1];

    const hash = crypto.enc.Base64.parse(`attachment-${Date.now()}`);

    const hex = crypto.enc.Hex.stringify(hash);

    cb(null, `${hex}.${type}`);
  },
});

/**
 * File upload restrictions.
 */
export const limits = {
  files: 1,
  fields: 10,
  fileSize: 500 * 1024,
};

/**
 * Absolute path attachment.
 */
export const attachment = (path: string): string => join(__dirname, '../../uploads', path);
