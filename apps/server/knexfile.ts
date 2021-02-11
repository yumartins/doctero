const knexfile = {
  client: 'pg',
  connection: {
    user: process.env.USER_DB || 'yumartins',
    host: process.env.HOST_DB || '127.0.0.1',
    database: process.env.DATABASE_DB || 'doctero',
    password: process.env.PASSWORD_DB || 'postgres',
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
