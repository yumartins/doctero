import dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '../../../../.env') });

/**
 * Absolute path attachment.
 */
const attachment = (path: string): string => `${process.env.API_URL}/attachments/${path}`;

export default attachment;
