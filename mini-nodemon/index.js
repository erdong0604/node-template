const chokidar = require('chokidar');
const { exec,spawn } = require('child_process');
const debounceRestart = debounce(restartProcess,1000);
let myWs;
const WebSocketServer = require('ws').Server;
wss = new WebSocketServer({ port: 8181 });//服务端口8181
wss.on('connection', function (ws) {
    console.log('服务端：客户端已连接');
    myWs = ws;
    ws.on('message', function (message) {
        //打印客户端监听的消息
        console.log(message);
    });
});
let childProcess = null
// 1.监听文件改变
chokidar.watch(['./main.js','./views/*']).on('all', (event, path) => {
  debounceRestart()
});

// exec('node test.js',(err,stdout) =>{
//   // console.log(stdout);
// })
// 2.重新启动node脚本

//1) exec
//2) spawn

// 区别:exec 会等到脚本执行完毕一次性输出结果
// spawn 执行时就会返回数据
// 一般使用spawn

function restartProcess(){
  if(!childProcess){
    console.log('starting `node app.js`');
  }else{
    myWs&&myWs.send('文件变更了，刷新页面吧')
    console.log('restarting due to changes...');
  }
  childProcess && childProcess.kill(); // 如果进程已经启动,先杀死进程
  childProcess = spawn('node',['main.js'],{stdio:'inherit'})
}

// 3.每次保存main.js都会重新执行脚本,需要加防抖

function debounce(fn,delay){
  let timer;
  return () => {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    },delay)
  }
}

