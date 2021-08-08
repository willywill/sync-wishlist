import knex from 'knex';
import log from 'winston';
import path from 'path';

const dbConfig = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, './data/wishlist.db'),
  },
  useNullAsDefault: true,
  migrations: {
    directory: './data/migrations',
  },
  seeds: {
    directory: './data/seeds',
  },
};

let database = null;

const initializeDatabase = () => {
  if (database) {
    return database;
  }

  database = knex(dbConfig);

  database.on('query-error', (error, query = {}) => {
    log.error({ message: 'Database Error', error, query });
    throw error;
  });

  log.info('Database connection successful.');

  return database;
};

export default initializeDatabase;
