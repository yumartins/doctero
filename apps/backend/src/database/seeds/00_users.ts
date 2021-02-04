import * as Knex from 'knex';

const users = async (knex: Knex): Promise<void> => {
  await knex('users').del();

  await knex('users').insert([
    { id: 1, colName: 'rowValue1' },
    { id: 2, colName: 'rowValue2' },
    { id: 3, colName: 'rowValue3' },
  ]);
};

export default users;
