// app.js

App({
  globalData: {
    userInfo: null
  },
  onLaunch(options) {
    // 第一次打开

    // 展示本地存储能力
    var logs = my.getStorageSync('logs') || []
    logs.unshift(Date.now())
    my.setStorageSync('logs', logs)

    // 登录
    my.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    my.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          my.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
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
        success: res => {
          console.info('authCode>>>>>>>>>', res.authCode);

          my.httpRequest({
            url: '/users?authcode=' + res.authCode,
            method: 'GET',
            success: function (res) {
              console.log('user info>>>>>>>>>>>', res)
              resolve(res.data)
            },
            fail: function (res) {
              console.log('query user info fail>>>>>>>', res)
              my.alert({ content: 'fail: ' + res })
            },
            complete: function (res) {
              console.log('query user info complete>>>>>>', res)
            }
          })
        },
        fail: () => {
          console.log('get authcode fail')
          reject({})
        }
      })
    })
  }
})