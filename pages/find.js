// find.js
const app = getApp()

Page({
  data: {
    loading: true,
    list: []
  },
  onLoad (){

  },
  onReady() {
    setTimeout(() => {
      this.setData({
        list: my.getStorageSync('logs') || [],
        loading: false
      })
    }, 1000)
  },
  onUnload() {

  }
})
