const { findGuaByCode, findBianGua } = require('../../utils/guaData');

Page({
  data: {
    showingCoins: false,
    showOptions: false,
    coins: [0, 0, 0], // 0表示反面，1表示正面
    currentStep: 0,
    history: [], // 记录每次摇卦结果
    canShake: true, // 防止连续摇动
    lastShakeTime: 0 // 记录上次摇动时间
  },
  
  onLoad() {
    // 监听加速度数据
    wx.onAccelerometerChange(this.onShake.bind(this));
  },
  
  onUnload() {
    // 关闭监听
    wx.stopAccelerometer();
  },
  
  onShow() {
    // 重置状态
    if (this.data.currentStep >= 6) {
      this.setData({
        showingCoins: false,
        showOptions: false,
        currentStep: 0,
        history: []
      });
    }
  },
  
  onShake(res) {
    if (!this.data.canShake || this.data.currentStep >= 6) return;
    
    const now = Date.now();
    // 防止频繁触发，至少间隔1秒
    if (now - this.data.lastShakeTime < 1000) return;
    
    // 检测摇动强度
    const intensity = Math.abs(res.x) + Math.abs(res.y) + Math.abs(res.z);
    if (intensity > 20) {
      this.data.lastShakeTime = now;
      this.data.canShake = false;
      this.shakeCoins();
      
      // 防止连续触发
      setTimeout(() => {
        this.setData({ canShake: true });
      }, 1500);
    }
  },
  
  // 摇动硬币
  shakeCoins() {
    this.setData({
      showingCoins: false,
      showOptions: false
    });
    
    // 模拟硬币翻转动画
    let flipCount = 0;
    const flipInterval = setInterval(() => {
      flipCount++;
      const tempCoins = this.data.coins.map(() => Math.round(Math.random()));
      this.setData({ coins: tempCoins });
      
      // 显示硬币
      if (flipCount === 1) {
        this.setData({ showingCoins: true });
      }
      
      // 停止动画
      if (flipCount >= 10) {
        clearInterval(flipInterval);
        const finalCoins = [
          Math.round(Math.random()),
          Math.round(Math.random()),
          Math.round(Math.random())
        ];
        this.setData({
          coins: finalCoins,
          showOptions: true
        });
      }
    }, 100);
  },
  
  // 获取历史记录文本
  getHistoryText(value) {
    const texts = ['老阴', '少阴', '少阳', '老阳'];
    return texts[value] || '';
  },
  
  // 获取历史记录样式类
  getHistoryClass(value) {
    const classes = ['laoyin', 'shaoyin', 'shaoyang', 'laoyang'];
    return classes[value] || '';
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
    // 本卦代码(不变)
    let benCode = '';
    // 变卦代码(变爻后)
    let bianCode = '';
    
    for (const item of this.data.history) {
      if (item === 3) { // 老阳 → 变少阴(0)
        benCode += '1';
        bianCode += '0';
      } else if (item === 0) { // 老阴 → 变少阳(1)
        benCode += '0';
        bianCode += '1';
      } else if (item === 2) { // 少阳 → 不变(1)
        benCode += '1';
        bianCode += '1';
      } else if (item === 1) { // 少阴 → 不变(0)
        benCode += '0';
        bianCode += '0';
      }
    }
    
    // 存储卦象结果
    const app = getApp();
    app.globalData.guaResult = {
      benCode,      // 本卦代码
      bianCode,     // 变卦代码
      history: this.data.history,
      benGua: findGuaByCode(benCode),
      bianGua: findGuaByCode(bianCode),
      bianInfo: findBianGua(benCode, bianCode)
    };
    
    // 跳转到结果页
    wx.navigateTo({
      url: '/pages/result/result'
    });
  }
});
