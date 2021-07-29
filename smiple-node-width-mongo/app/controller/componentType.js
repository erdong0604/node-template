const componentTypeModal = require("./../model/componentType");



const list = async (ctx, next) => {
  console.log(ctx.appConfig);
  try{
    const res = await componentTypeModal.find();
    ctx.success(res);
  }catch(e){
    ctx.fail(e)
  }
};

module.exports = {
  list
};
