import mongoose from 'mongoose';
import log from 'winston';
import config from '../config';

const initializeDatabase = () => mongoose.connect(config.db.connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => log.info({ message: 'Database connection successful.' }))
  .catch((error) => log.error({ message: 'Database connection failed.', error: error.messsage }));

export default initializeDatabase;
