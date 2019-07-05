// auth.js

Page({
  data: {
    id: 0
  },
  onLoad(option) {
    if (option.id) {
      this.setData({
        id: option.id
      })
    }
  },
  getUserInfo(e) {
    let a = e.detail
    if ('getUserInfo:ok' == a.errMsg) {
      my.login({
        success(data) {
          if (data.code) {
            let n = {
              code: data.code,
              encryptedData: a.encryptedData,
              iv: a.iv,
              signature: a.signature
            }
            my.showToast({
              title: '授权中...',
              icon: 'loading',
              duration: 2000,
              success: () => {
                my.sumbitLogin(n, () => {
                  n = null
                  let t = getCurrentPages()
                  if (t.length > 1) {
                    t[t.length - 2].onReady()
                    my.navigateBack()
                  }
                  else {
                    my.redirectTo({
                      url: '/pages/index'
                    })
                  }
                })
              }
            })
          }
        }
      })
    }
  }
})
