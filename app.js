App({
  onLaunch() {
    // 检查兼容性
    if (wx.canIUse('onAccelerometerChange')) {
      console.log('支持加速度计');
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用摇一摇功能',
        showCancel: false
      });
    }
  },
  globalData: {
    guaResult: null
  }
})
