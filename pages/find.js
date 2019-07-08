// find.js
const app = getApp()

Page({
  data: {
    loading: true,
    list: []
  },
  onLoad() {

  },
  onReady() {
    setTimeout(() => {
      this.setData({
        loading: false
      })
    }, 1000)
  },
  onUnload() {

  },
  chooseCity() {
    my.chooseCity({
      showLocatedCity: true,
      showHotCities: true,
      success: (res) => {
        my.alert({
          title: 'chooseAlipayContact response: ' + JSON.stringify(res)
        })
      }
    })
  },
  chooseLocation() {
    my.chooseLocation({
      success: (res) => {
        my.alert({
          title: 'chooseAlipayContact response: ' + JSON.stringify(res)
        })
      },
      fail: (error) => {
        my.alert({ content: '调用失败：' + JSON.stringify(error), });
      },
    })
  },
  choosePhoneContact() {
    my.choosePhoneContact({
      success: (res) => {
        my.alert({
          content: 'choosePhoneContact response: ' + JSON.stringify(res)
        })
      },
      fail: (res) => {
        my.alert({
          content: 'choosePhoneContact response: ' + JSON.stringify(res)
        })
      }
    })
  },
  scan() {
    my.scan({
      type: 'qr',
      success: (res) => {
        my.alert({ title: res.code })
      }
    })
  }
})
