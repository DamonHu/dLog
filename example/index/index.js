const dLog = require('../utils/dLog.js')

Page({
  data: {

  },
  onLoad() {
    dLog.netLog("https://www.hudongdong.com", {"userID": 0}, {"code": 0, "msg": "test"})
    dLog.log("普通日志")
    dLog.warn("warn", "loggg")
    dLog.error({"reason": "吃吃吃"})
    dLog.color("hello world")
  },
})
