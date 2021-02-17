import dotenv from 'dotenv';
import { join } from 'path';
import swagger from 'swagger-jsdoc';

dotenv.config({ path: join(__dirname, '../../../.env') });

const options = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: 'Hello World',
      version: '0.0.1',
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
