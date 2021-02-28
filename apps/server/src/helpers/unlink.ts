import fs from 'fs';
import { promisify } from 'util';

import attachment from './attachment';

const promise = promisify(fs.unlink);

/**
 * Unlink / Delete file.
 */
const unlink = async (path: string): Promise<void> => {
  await promise(attachment(path));
};

export default unlink;
