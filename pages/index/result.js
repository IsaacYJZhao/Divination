Page({
  data: {
    guaCode: '',
    history: [],
    guaInfo: {}
  },
  
  onLoad() {
    const app = getApp();
    const guaResult = app.globalData.guaResult;
    
    this.setData({
      guaCode: guaResult.code,
      history: guaResult.history,
      guaInfo: guaResult.guaInfo
    });
  },
  
  backToHome() {
    wx.navigateBack();
  }
});
