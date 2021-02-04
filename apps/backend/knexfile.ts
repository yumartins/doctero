const knexfile = {
  client: 'pg',
  connection: {
    user: 'yumartins',
    database: 'doctero',
    password: '0000',
  },

  migrations: {
    tableName: 'migrations',
    directory: `${__dirname}/src/database/migrations`,
  },

  useNullAsDefault: true,
};

export default knexfile;
