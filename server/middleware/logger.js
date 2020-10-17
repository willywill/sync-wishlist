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

  next();
};

export default logger;
