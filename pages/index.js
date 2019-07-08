// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    sys: '',
    loading: true
  },
  onLoad() {
    setTimeout(() => {
      const sys = my.getSystemInfoSync()
      this.setData({
        sys: JSON.stringify(sys),
        loading: false
      })
    }, 1000)
  }
})
