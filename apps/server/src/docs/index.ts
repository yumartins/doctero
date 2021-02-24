import dotenv from 'dotenv';
import { join } from 'path';

import auth from './auth';
import tags from './tags';

dotenv.config({ path: join(__dirname, '../../../../.env') });

const docs = {
  openapi: '3.0.2',
  info: {
    title: 'Doctero.',
    version: '0.0.1',
    description: 'Documentation.',
  },
  servers: [{ url: process.env.API_URL }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ bearerAuth: [] }],
  tags,
  paths: {
    ...auth,
  },
};

export default JSON.stringify(docs);
