const knexfile = {
  client: 'pg',
  connection: {
    user: 'yumartins',
    host: '127.0.0.1',
    database: 'doctero',
    password: 'postgres',
  },

  seeds: {
    directory: `${__dirname}/src/database/seeds`,
    extension: 'ts',
  },

  migrations: {
    directory: `${__dirname}/src/database/migrations`,
    extension: 'ts',
  },

  useNullAsDefault: true,
};

export default knexfile;
