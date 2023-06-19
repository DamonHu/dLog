/**
 *@description: 调试日志工具
 *@author: DamonHu
 *@date: 2023-06-12
 *Copyright © 1999-2023 DamonHu. All rights reserved.
 */

const logOutput = true    //是否输出
const realtimeLogEnable = true        //开启实时日志

const deviceInfo = wx.getDeviceInfo() //设备信息
const realtimeLog = wx.getRealtimeLogManager()

/******** 网络日志输出 ********/ 
function netLog(url, request, response, method="POST", success=true) {
  if (logOutput) {
    var background = "#f94e3f"
    if (success) {
      background = "#0080ff"
    }
    console.log(
      `%c 网络请求 %c ${method} %c ${url}`,
      `background:${background} ; padding: 3px 5px 3px 5px; border-radius: 3px 0 0 3px;  color: #fff`,
      "background:#41b883 ; padding: 3px 5px 3px 5px; border-radius: 0 3px 3px 0;  color: #fff",
      "background:transparent"
    );
    if (deviceInfo.platform == "devtools") {
      console.groupCollapsed("🚀 request")
      console.table(request)
      console.groupEnd("🚀 request")
    
      console.group("🎉 response")
      console.log(response)
      console.groupEnd("🎉 response")
    } else {
      console.log("🚀 request", request, "\n🎉 response", response)
    }
  }
  if (realtimeLogEnable) {
    realtimeLog.info(url, "\n🚀 request", request, "\n🎉 response", response)
  }
}

/******** 通用日志输出 ********/ 
function debug() {
  if (logOutput) {
    _consoleTemplate("debug", arguments)
  }
}

function log() {
  if (logOutput) {
    _consoleTemplate("log", arguments)
  }
  if (realtimeLogEnable) {
    realtimeLog.info.apply(realtimeLog, arguments)
  }
}

function warn(log) {
  if (logOutput) {
    _consoleTemplate("warn", arguments)
  }
  if (realtimeLogEnable) {
    realtimeLog.warn.apply(realtimeLog, arguments)
  }
}

function error(log) {
  if (logOutput) {
    _consoleTemplate("error", arguments)
  }
  if (realtimeLogEnable) {
    realtimeLog.error.apply(realtimeLog, arguments)
  }
}

function color(string, color="#f94e3f", background="transparent") {
  if (logOutput) {
    if (background == "transparent") {
      console.log(`%c${string}`, "color: " + color + "; background: " + background)
    } else {
      console.log(`%c${string}`, "padding: 3px 8px 3px 8px; color: " + color + "; background: " + background)
    }
  }
}

/******** 私有函数 ********/ 
function _consoleTemplate(level, message) {
  if (message.length == 0) {
    //没有输入数据
    return
  }
  let color = "#3ac569"
  if (level == "debug") {
    color = "#0080ff"
  } else if (level == "warn") {
    color = "#f8ca00"
  } else if (level == "error") {
    color = "#ff4e50"
  }
  console.log("%c[%s] %c%s", "color:" + color, _loggerformatTime(new Date()), `background:${color}; padding: 1px 3px 1px 3px; border-radius:3px; color: #fff;`, level);
  

  if (level == "error"){
    if (deviceInfo.platform == "devtools") {
      console.log.apply(console, message)
      console.groupCollapsed("🐛 error trace:");
      console.trace();
      console.groupEnd();
    } else {
      console.error.apply(console, message)
    }
  } else {
    console.log.apply(console, message)
  }
}

// 时间组装
const _formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//获取一个时间的年月日时分秒毫秒
const _loggerformatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const millisecond = date.getMilliseconds()
  return [year, month, day].map(_formatNumber).join('-') + ' ' + [hour, minute, second, millisecond].map(_formatNumber).join(':')
}

module.exports = {
  netLog,
  debug,
  log,
  color,
  warn,
  error
}