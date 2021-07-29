const Config = require('./../../config');

function useConfig(option = {}) {
  return async (ctx, next) => {
    ctx.appConfig = Config;
    await next();
  };
}

module.exports = useConfig;
