const { findGuaByCode } = require('../../utils/guaData');

Page({
  data: {
    benCode: '',
    bianCode: '',
    history: [],
    benGua: {},
    bianGua: {},
    bianInfo: {}
  },
  
  onLoad() {
    const app = getApp();
    const guaResult = app.globalData.guaResult;
    
    if (!guaResult) {
      wx.showToast({
        title: '未获取到卦象数据',
        icon: 'none'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
      return;
    }
    
    this.setData({
      benCode: guaResult.benCode,
      bianCode: guaResult.bianCode,
      history: guaResult.history,
      benGua: guaResult.benGua,
      bianGua: guaResult.bianGua,
      bianInfo: guaResult.bianInfo
    });
  },
  
  // 获取爻的描述
  getYaoDesc(index) {
    const original = this.data.history[index];
    const texts = ['老阴', '少阴', '少阳', '老阳'];
    return texts[original] || '';
  },
  
  // 获取变爻的描述
  getBianYaoDesc(index) {
    const original = this.data.history[index];
    if (original === 3) return '老阳变阴';
    if (original === 0) return '老阴变阳';
    if (original === 2) return '少阳(不变)';
    if (original === 1) return '少阴(不变)';
    return '';
  },
  
  // 判断是否有变爻
  hasChange(index) {
    const original = this.data.history[index];
    return original === 0 || original === 3;
  },
  
  // 获取变爻结果
  getChangeResult(index) {
    const original = this.data.history[index];
    if (original === 3) return '变为阴';
    if (original === 0) return '变为阳';
    return '';
  },
  
  // 返回首页
  backToHome() {
    wx.navigateBack();
  },
  
  // 保存结果
  saveResult() {
    wx.showToast({
      title: '保存成功',
      icon: 'success'
    });
    
    // 实际开发中可以保存到本地缓存或上传服务器
    try {
      const savedGuas = wx.getStorageSync('savedGuas') || [];
      savedGuas.unshift({
        date: new Date().toLocaleString(),
        benGua: this.data.benGua.name,
        bianGua: this.data.bianGua.name,
        code: `${this.data.benCode}_${this.data.bianCode}`
      });
      wx.setStorageSync('savedGuas', savedGuas.slice(0, 50)); // 最多保存50条
    } catch (e) {
      console.error('保存失败', e);
    }
  }
});
