"ui";
ui.layout(
  <vertical>
    <list id='scripts'>
      <card w="*" h="70" margin="10 5" cardCornerRadius="2dp" cardElevation="5dp" foreground="?selectableItemBackground">
        <horizontal w='*' margin='6 6 6 6' bg='{{this.bg}}'>
          <frame layout_weight="1" layout_height='match_parent'>
            <vertical bg='#ffff00' layout_weight="1" layout_height='match_parent'>
              <text id='name' text='{{this.name}}' textSize="15sp" textColor='#000000'
                bg='{{this.bg}}' layout_weight="1" gravity='left|center'></text>
            </vertical>
          </frame>
        </horizontal>
      </card>
    </list>
  </vertical>
);



threads.start(
  function () {
    const res = getFileList();

    setUIList(res)
  }
)

function getFileList() {
  var res = http.get('https://test-test-bgzbfyqzpq.cn-hangzhou.fcapp.run/')
  return res.body.json()
}


function setUIList(scriptList) {
  // 间隔行变色
  for (var i = 0; i < scriptList.length; i++) {
    if (i % 2 == 0) {
      scriptList[i].bg = '#87CEEB'
    } else {
      scriptList[i].bg = '#C0FF3E'
    }
  }

  // 设置list内容, 添加点击事件
  ui.run(
    function () {
      ui.scripts.setDataSource(scriptList)
      ui.scripts.on("item_click", function (item, i, itemView, listView) {
        // 点击后,下载后运行该脚本
        threads.start(
          function () {
            var scriptPath = downloadScript(item.url, item.name)
            log('开始执行下载的文件')
            // engines.execScriptFile(scriptPath);
            log('结束执行下载的文件')
          }
        )
      });
    }
  )

  // 下载文件到指定位置
  function downloadScript(scriptUrl, scriptName) {
    const r = http.get(scriptUrl).body.bytes()
    const scriptPath = './' + scriptName
    const path = scriptPath.replace(/(.*\/).*?$/, '$1')
    files.createWithDirs(path);
    files.writeBytes(scriptPath, r)
    return scriptPath
  }
}
