import { diskStorage } from '@koa/multer';
import { join } from 'path';

/**
 * Upload file storage path.
 */
export const storage = diskStorage({
  destination(_, __, cb) {
    cb(null, join(__dirname, '/uploads'));
  },

  filename(_, file, cb) {
    const type = file.originalname.split('.')[1];

    cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`);
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
