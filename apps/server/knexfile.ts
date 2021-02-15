import 'dotenv/config';

const knexfile = {
  client: 'pg',
  connection: {
    user: process.env.USER_DB,
    host: process.env.HOST_DB,
    database: process.env.DATABASE_DB,
    password: process.env.PASSWORD_DB,
  },

  seeds: {
    directory: `${__dirname}/src/database/seeds`,
    extension: 'ts',
  },

  migrations: {
    directory: `${__dirname}/src/database/migrations`,
    extension: 'ts',
  },

  updated: (table: string): string => `
    CREATE TRIGGER ${table}_updated_at
    BEFORE UPDATE ON ${table}
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
  `,

  useNullAsDefault: true,
};

export default knexfile;
