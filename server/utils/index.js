import curry from 'ramda/src/curry';

export const viewRoute = curry((router, app, path) => router.get(path, async (ctx) => {
  await app.render(ctx.req, ctx.res, path, ctx.query);
  ctx.respond = false;
}));

export default {};
