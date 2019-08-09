//app.js
App({
  onLaunch: function () {

  },
  /**
 * get请求
 */
  get: function (url) {
    var that = this;
    const promise = new Promise((resolve, reject) => {
      wx.request({
        url: url,
        success: function (res) {
          if (res.data.code == 200) {
            resolve(res.data);
          } else {
            reject(res.data.code + "--" + res.data.message);
          }
        },
        error: function (e) {
          reject('网络出现异常' + e);
        }
      })
    });
    return promise;
  },

  /**
 * post请求
 */
  post: function (url, data) {
    var that = this;
    const promise = new Promise((resolve, reject) => {
      var postData = data || {};
      wx.request({
        url: url,
        data: postData,
        success: function (res) {
          if (res.data.code == 200) {
            resolve(res.data);
          } else {
            reject(res.data.code + "--" + res.data.message);
          }
        },
        error: function (e) {
          reject('网络出现异常' + e);
        }
      })
    });
    return promise;
  },
})