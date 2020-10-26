import KoaRouter from 'koa-router';

const Router = (app) => {
  const handle = app.getRequestHandler();
  const router = new KoaRouter();

  const defaultHandler = async (ctx) => {
    ctx.respond = false;
    await handle(ctx.req, ctx.res);
  };

  // Wishlist manage url
  router.get('/wishlist/:wishlistId', async (ctx) => {
    ctx.respond = false;
    await app.render(ctx.request, ctx.res, '/wishlist', { ...ctx.query, ...ctx.params });
    return true;
  });

  router.get('*', defaultHandler);

  return router;
};

export default Router;
