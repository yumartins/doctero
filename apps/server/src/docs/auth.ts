import responses from './responses';

const auth = {
  '/auth': {
    post: {
      tags: ['Auth'],
      summary: 'Login',
      requestBody: {
        required: true,
        description: '"email" must be unique.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: { type: 'string', default: 'yuri@estudioflow.com.br' },
                password: { type: 'string', default: '123456' },
              },
            },
          },
        },
      },
      responses,
    },
  },
};

export default auth;
