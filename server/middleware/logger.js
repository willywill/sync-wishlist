import winston from 'winston';
import chalk from 'chalk';

winston.configure({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
  ),
  exitOnError: false,
});

const logger = () => (ctx, next) => {
  const { method, url, time = new Date() } = ctx.req;
  const statusCode = ctx.status;

  const localDate = time.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const localTime = time.toLocaleTimeString('en-US');

  const timeStamp = `${localDate} ${localTime}`;

  winston.info(`${chalk.green('-->')} ${chalk.blue(method)} ${chalk.blue(url)} @ ${chalk.yellow(timeStamp)}`);
  winston.info(`${chalk.green('<--')} ${chalk.blue('OUT')} ${chalk.blue(statusCode)} @ ${chalk.yellow(timeStamp)}`);

  return next();
};

export const attachLoggerToContext = () => (ctx, next) => {
  ctx.log = (level, info = {}) => {
    if (typeof level !== 'string') {
      throw new Error('Invalid log level type. Must be a string');
    }

    if (typeof info !== 'object') {
      throw new Error('Invalid log info. Must be a type of object');
    }

    if (!info?.message && level === 'error') {
      throw new Error('Invalid log info. Must attach a message to the log.');
    }

    const logLevel = level || 'info';
    winston[logLevel](info);
  };

  return next();
};

export default logger;
