// my/index.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    loading: true
  },
  onLoad() {
    app.getUserInfo().then(res => {
      this.setData({
        userInfo: res
      })
    }).catch(err => {
      console.log(err)
    })
    setTimeout(() => {
      this.setData({
        loading: false
      })
    }, 1000)
  }
})
