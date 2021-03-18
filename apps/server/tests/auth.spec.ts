import request from 'supertest';

import app from '../src/app';

describe('Testing authentication scenarios.', () => {
  it('logged user data and status 200 must be returned', async () => {
    const res = await request(app).post('/api/auth').send({
      email: 'yuri@estudioflow.com.br',
      password: '123456',
    });

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });
});
