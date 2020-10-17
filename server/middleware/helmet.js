import helmet from 'koa-helmet';

const securityPolicy = () => helmet({
  frameguard: {
    action: 'deny',
  },
});

export default securityPolicy;
