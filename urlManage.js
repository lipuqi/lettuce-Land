const host = 'http://122.112.156.177:8013';

var urlConfig = {
  host,
  /**
   * 开发接口
   */
  api: {
    host,
    //获取灯的状态
    bulbStatusUrl: `${host}/app/getBulbStatus`,
    //获取设备的状态
    operationPiStatusUrl: `${host}/app/getOperationPiStatus`,
    //发送指令
    sendCommandUrl: `${host}/app/sendCommand`
  }

};

module.exports = urlConfig;