import {
  it,
  expect,
  describe,
  afterAll,
} from '@jest/globals';
import request from 'supertest';

import app from '../src';

describe('Testing authentication scenarios.', () => {
  it('logged user data and status 200 must be returned.', async () => {
    const res = await request(app)
      .post('/api/auth')
      .send({
        email: 'yuri@estudioflow.com.br',
        password: '123456',
      });

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('log in with invalid user and return invalid email.', async () => {
    const res = await request(app)
      .post('/api/auth')
      .send({
        email: 'yuri@meuemail.com',
        password: '123456',
      });

    expect(res.status).toEqual(401);
    expect(res.body).toHaveProperty('message');
  });

  afterAll(async (done) => app.close(done));
});
