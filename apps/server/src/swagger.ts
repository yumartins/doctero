import dotenv from 'dotenv';
import { join } from 'path';
import swagger from 'swagger-jsdoc';

dotenv.config({ path: join(__dirname, '../../../.env') });

const options = {
  definition: {
    openapi: '3.0.2',
    info: {
      title: 'Doctero.',
      version: '0.0.1',
      description: 'Documentation.',
    },
    servers: [
      { url: 'http://localhost:3333' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    'src/docs/*.yml',
  ],
};

const docs = swagger(options);

export default docs;
