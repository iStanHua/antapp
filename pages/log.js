// log.js
const app = getApp()

Page({
  data: {
    list: []
  },
  onLoad (){

  },
  onReady() {
    this.setData({
      list: my.getStorageSync('logs') || []
    })
  },
  onUnload() {

  }
})
