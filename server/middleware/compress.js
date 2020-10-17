import compression from 'koa-compress';

const compress = () => compression({ br: true });

export default compress;
