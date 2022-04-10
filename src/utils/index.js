const util = {}
const utilPath = './utils'
// 下载文件到指定位置
util.downloadScript = function downloadScript(scriptUrl, scriptName) {
  const r = http.get(scriptUrl).body.bytes()
  const scriptPath = './' + scriptName
  const path = scriptPath.replace(/(.*\/).*?$/, '$1')
  files.createWithDirs(path);
  files.writeBytes(scriptPath, r)
  return scriptPath
}

// 获取文件列表
util.getFileList = function getFileList() {
  var res = http.get('https://test-test-bgzbfyqzpq.cn-hangzhou.fcapp.run/')
  return res.body.json()
}

// 更新工具函数
util.update = function update() {
  const res = getFileList().filter(item => item.name.startsWith('utils/'));
  files.removeDir(utilPath + '/');
  res.forEach(item => {
    downloadScript(item.url, item.name)
  })
}

module.exports = util;

