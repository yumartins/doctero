import { bcrypt, remove } from '@core/helpers';
import { Context } from 'koa';

import knex from '../database';
import { unlink, attachment } from '../helpers';

const me = {
  show: async (ctx: Context): Promise<void> => {
    const {
      user,
    } = ctx.state;

    ctx.status = 200;

    ctx.body = remove('password', { ...user, avatar: user?.avatar ? attachment(user.avatar) : null });
  },

  media: async (ctx: Context): Promise<void> => {
    const {
      user,
    } = ctx.state;

    const {
      id,
    } = user;

    /**
     * Check if you are sending an attachment.
     */
    if (! ctx.file) ctx.throw(400, 'Send an attachment.');

    await knex('users')
      .update({
        avatar: ctx.file.filename,
      })
      .where({ id });

    ctx.status = 200;
  },

  update: async (ctx: Context): Promise<void> => {
    const {
      user,
    } = ctx.state;

    const {
      name,
      email,
      phone,
      address,
      company,
      password,
      birthday,
    } = ctx.request.body;

    if (email) {
      const database = await knex('users').where({ email }).first();

      if (email === database?.email) ctx.throw(400, 'Registered user.');
    }

    const hash = password ? await bcrypt.hash(password) : user.password;

    await knex('users')
      .update({
        name,
        email,
        phone,
        address,
        company,
        birthday,
        password: hash,
      })
      .where({ id: user.id })
      .returning('*')
      .then((usered) => {
        ctx.body = remove('password', usered[0]);
      });
  },

  delete: async (ctx: Context): Promise<void> => {
    const {
      user,
    } = ctx.state;

    const {
      id,
      company_id,
    } = user;

    if (company_id === null) ctx.throw(400, 'This user cannot be deleted.');

    await knex('users')
      .where({ id })
      .del()
      .returning('avatar')
      .then((us) => unlink(us[0]));

    ctx.status = 200;
  },
};

export default me;
