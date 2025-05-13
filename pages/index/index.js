const { findGuaByCode } = require('../../utils/guaData');

Page({
  data: {
    showingCoins: false,
    showOptions: false,
    coins: [0, 0, 0], // 0表示反面，1表示正面
    currentStep: 0,
    history: [], // 记录每次摇卦结果
    canShake: true // 防止连续摇动
  },
  
  onLoad() {
    // 监听加速度数据
    wx.onAccelerometerChange(this.onShake.bind(this));
  },
  
  onUnload() {
    // 关闭监听
    wx.stopAccelerometer();
  },
  
  onShake(res) {
    if (!this.data.canShake || this.data.currentStep >= 6) return;
    
    // 检测摇动强度
    const intensity = Math.abs(res.x) + Math.abs(res.y) + Math.abs(res.z);
    if (intensity > 15) {
      this.data.canShake = false;
      this.shakeCoins();
      
      // 防止连续触发
      setTimeout(() => {
        this.setData({ canShake: true });
      }, 2000);
    }
  },
  
  // 摇动硬币
  shakeCoins() {
    this.setData({
      showingCoins: false,
      showOptions: false
    });
    
    // 模拟硬币翻转动画
    const flipInterval = setInterval(() => {
      const tempCoins = this.data.coins.map(() => Math.round(Math.random()));
      this.setData({ coins: tempCoins });
    }, 100);
    
    // 停止动画并显示结果
    setTimeout(() => {
      clearInterval(flipInterval);
      const finalCoins = [
        Math.round(Math.random()),
        Math.round(Math.random()),
        Math.round(Math.random())
      ];
      this.setData({
        coins: finalCoins,
        showingCoins: true,
        showOptions: true
      });
    }, 1000);
  },
  
  // 选择卦象结果
  selectOption(e) {
    const value = parseInt(e.currentTarget.dataset.value);
    const newHistory = [...this.data.history, value];
    
    this.setData({
      history: newHistory,
      currentStep: newHistory.length,
      showOptions: false
    });
    
    // 如果已经摇了6次，生成卦象
    if (newHistory.length === 6) {
      this.generateGua();
    }
  },
  
  // 生成卦象
  generateGua() {
    // 将历史记录转换为卦象代码 (3和0是老阳老阴，会变爻)
    let guaCode = '';
    for (const item of this.data.history) {
      if (item === 3) { // 老阳
        guaCode += '1';
      } else if (item === 0) { // 老阴
        guaCode += '0';
      } else if (item === 2) { // 少阳
        guaCode += '1';
      } else if (item === 1) { // 少阴
        guaCode += '0';
      }
    }
    
    // 存储卦象结果并跳转到结果页
    const app = getApp();
    app.globalData.guaResult = {
      code: guaCode,
      history: this.data.history,
      guaInfo: findGuaByCode(guaCode)
    };
    
    wx.navigateTo({
      url: '/pages/result/result'
    });
  },
  
  // 重新开始
  restart() {
    this.setData({
      showingCoins: false,
      showOptions: false,
      currentStep: 0,
      history: []
    });
  }
});
