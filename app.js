// app.js

App({
  globalData: {
    userInfo: null
  },
  onLaunch(options) {
    // 第一次打开
  },
  onShow(options) {
    // 小程序启动，或从后台被重新打开
    console.log(options)
  },
  onHide() {
    // 小程序从前台进入后台
  },
  onError(msg) {
    // 小程序发生脚本错误或 API 调用出现报错
    console.log(msg);
  },
  getUserInfo() {
    return new Promise((resolve, reject) => {
      if (this.globalData.userInfo) resolve(this.globalData.userInfo)

      my.getAuthCode({
        scopes: 'auth_user',
        fail: (error) => {
          console.error('getAuthCode', error);
        },
        success: () => {
          // do login...
          // then
          my.getAuthUserInfo({
            fail: () => {
              reject({})
            },
            success: (userInfo) => {
              this.globalData.userInfo = userInfo
              resolve(userInfo)
            }
          })
        }
      })
    })
  }
})