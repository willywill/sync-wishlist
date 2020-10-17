import Koa from 'koa';
import cluster from 'cluster';
import log from 'winston';
import Next from 'next';
import {
  parser,
  compress,
  securityPolicy,
  graphql,
  logger,
} from './middleware';
import Router from './routes';
import config from './config';
import { apolloServer } from './middleware/graphql';

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV !== 'production';

const nextApp = Next({ dir: './client', dev: isDevelopment });

const initializeNext = () => nextApp.prepare()
  .then(() => {
    const app = new Koa();

    app.on('error', (error) => {
      log.error('App Level Error:', { error });
    });

    process.on('uncaughtException', (error) => {
      log.error('Unhandled Exception:', { error });
    });

    process.on('unhandledRejection', (error) => {
      log.error('Unhandled Promise Rejection:', { error });
    });

    /**
   * Middleware
   */
    app.use(parser());
    app.use(securityPolicy());
    app.use(compress());
    app.use(logger());
    app.use(graphql(app));

    /**
   * API Routes
   */
    app.use(async (ctx, next) => {
      if (ctx.path === '/healthcheck') {
        ctx.status = 200;
        return true;
      }

      return next();
    });

    /**
   * View Routes
   */
    const router = new Router(nextApp);

    app.use(async (ctx, next) => {
      ctx.status = 200;
      await next();
    });

    /**
   * Server Listen
   */
    app.use(router.routes());
    app.use(router.allowedMethods());

    app.listen(config.port, error => {
      if (error) throw error;

      log.info(`> Ready on http://localhost:${config.port}`);
      log.info(`> GraphQL ready on http://localhost:${config.port}${apolloServer.graphqlPath}`);
    });
  });

if (cluster.isMaster && !isDevelopment) {
  log.info(`Master ${process.pid} is running`);

  // eslint-disable-next-line global-require
  const numCPUs = require('os').cpus().length;

  // Create a worker for each CPU
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numCPUs; i++) {
    log.info(`Master ${process.pid} is running`);
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    log.info('Worker Died, restarting...', { pid: worker.process.pid, signal, code });
    cluster.fork();
  });
}
else {
  log.info(`Worker ${process.pid} started`);
  initializeNext();
}
