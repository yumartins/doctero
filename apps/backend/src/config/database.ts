const database = {
  port: 5432,
  user: 'yumartins',
  host: 'localhost',
  define: {
    timestamps: true,
    underscored: true,
  },
  dialect: 'postgres',
  database: 'doctero',
  password: 'postgres',
};

export default database;
