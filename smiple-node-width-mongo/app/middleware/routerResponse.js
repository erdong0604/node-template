function routerResponse(option = {}) {
  return async (ctx, next) => {
    ctx.success = function (data) {
      ctx.type = option.type || "json";
      ctx.body = {
        code: option.successCode || 200,
        msg: option.successMsg || "success",
        data: data || [],
      };
    };
    ctx.fail = function (msg, code) {
      console.log('error',msg)
      ctx.type = option.type || "json";
      ctx.body = {
        code: code || option.failCode || 99,
        msg: msg.toString() || option.successMsg || "fail",
      };
    };
    await next();
  };
}

module.exports = routerResponse;
