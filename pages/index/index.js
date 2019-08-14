const app = getApp();
const url = require('../../urlManage.js');

var showBusyLoading = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 5000
});

var showBusySuccess = text => wx.showToast({
  title: text,
  icon: 'success',
  duration: 2000
});

Page({
  data: {
    online: 0,//系统状态
    bulb: 0//灯状态
  },

  onShow() {
    var that = this;
    showBusyLoading("初始化中");
    //获取系统状态
    app.get(url.api.operationPiStatusUrl).then(function(res) {
      that.setData({
        online: Number(res.datas)
      }, function() {
        //获取灯的状态
        app.get(url.api.bulbStatusUrl).then(function(res) {
          that.setData({
            bulb: Number(res.datas)
          })
          wx.hideToast();
        }).catch(function (error) {
          console.log("获取灯的状态出现异常" + error)
          wx.hideToast();
        });
      })
    }).catch(function (error) {
      console.log("获取设备的状态出现异常" + error)
      wx.hideToast();
    });
  },

    /**
   * 对灯的操作
   */
  switchBulb(e) {
    var that = this;
    let value = Number(e.currentTarget.dataset.value)
    let bulbUrl = url.api.sendCommandUrl + "?method=ON_OFF&value=" + value
    showBusyLoading("执行中");
    app.get(bulbUrl).then(function (res) {
      that.setData({
        bulb: value
      },function(){
        wx.hideToast();
        showBusySuccess("执行成功")
      })
    }).catch(function (error) {
      console.log("发送灯操作指令出现异常" + error)
      wx.hideToast();
    });
  },

  /**
   * 设备下线处理
   */
  quit() {
    var that = this;
    let quitUrl = url.api.sendCommandUrl + "?method=QUIT_PYTHON&value=1"
    showBusyLoading("执行中");
    app.get(quitUrl).then(function (res) {
      that.setData({
        online: 0
      }, function () {
        wx.hideToast();
        showBusySuccess("执行成功")
      })
    }).catch(function (error) {
      console.log("发送下线操作指令出现异常" + error)
      wx.hideToast();
    });
  }
})