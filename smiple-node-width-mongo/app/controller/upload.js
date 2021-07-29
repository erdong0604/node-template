const path = require('path');
const fs = require('fs');

const mkdirFn = (dir) => {
  return new Promise((resolve, reject) =>{
    fs.mkdir(dir,function(err){
      if (err) {
        resolve(err);
        return;
      }
      resolve()
    });
  })
  
}

const upload = async (ctx,next) => {
  try{
    const file = ctx.request.files.file;
    if(!file){
      throw '缺少file字段'
    }
    const dir = ctx.appConfig.staticFilePath;
    const savePath = path.join(process.cwd(),dir);
    await mkdirFn(savePath);
    const reader = fs.createReadStream(file.path);
    const ext = file.name.split('.').pop();
    const fileName = file.name||`${Math.random().toString().replace('.','')}.${ext}`;
    const upStream = fs.createWriteStream(`${savePath}/${fileName}`);
    reader.pipe(upStream);
    ctx.success(`${dir}/${fileName}`);
  }catch(e){
    ctx.fail(e);
  }
}

module.exports = {
  upload,
}