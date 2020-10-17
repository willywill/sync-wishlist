import KoaRouter from 'koa-router';

const Router = (app) => {
  const handle = app.getRequestHandler();
  const router = new KoaRouter();

  const defaultHandler = async (ctx) => {
    ctx.respond = false;
    await handle(ctx.req, ctx.res);
  };

  router.get('*', defaultHandler);

  return router;
};

export default Router;
