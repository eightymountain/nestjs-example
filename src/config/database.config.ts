export default () => ({
  DB_HOST: process.env.DB_HOSTNAME || 'mariadb',
  DB_PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  DB_USER: process.env.MARIADB_USER || 'test',
  DB_PWD: process.env.MARIADB_PASSWORD || 'test',
  DB_NAME: process.env.MARIADB_DATABASE || 'test',
});
