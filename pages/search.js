// search.js

import { debounce } from '../utils/index'

const app = getApp()

Page({
  data: {
    history: [],
    hotList: ['小程序', '画布', '授权码', 'WiFi', '二维码', '生命周期', '导航', 'scroll-view', 'view', '地图'],
    searchVal: '',
    searchList: []
  },
  onLoad() {
    this.setData({
      history: my.getStorageSync({ key: 'searchHistory' }).data || []
    })

    this.onInput = debounce(this.onInput.bind(this), 400)
  },
  onReady() {
  },
  onUnload() {

  },
  onInput(e) {
    let searchList = []
    if (e.detail.value) {
      for (let i = 0; i < this.data.hotList.length; i++) {
        const item = this.data.hotList[i]
        if (item.indexOf(e.detail.value) > -1) {
          searchList.push(item)
        }
      }
    }
    this.setData({
      searchList,
      searchVal: e.detail.value
    })

    searchList = null
  },
  onTap(e) {
    this.addToHistory(e.currentTarget.dataset.val)
  },
  addToHistory(keyword) {
    const searchHistory = my.getStorageSync({ key: 'searchHistory' }).data || []
    let index = -1

    for (let i = 0; i < searchHistory.length; i++) {
      if (searchHistory[i].name === keyword) {
        index = i
        break
      }
    }

    let history = []

    if (searchHistory.length >= 8) {
      if (index === -1) {
        history = [keyword, ...searchHistory.slice(0, 7)]
      } else {
        searchHistory.splice(index, 1).slice(0, 7)
        history = [keyword, ...searchHistory]
      }
    } else {
      if (index === -1) {
        history = [keyword, ...searchHistory]
      } else {
        searchHistory.splice(index, 1)
        history = [keyword, ...searchHistory]
      }
    }

    my.setStorageSync({
      key: 'searchHistory',
      data: history
    })

    this.setData({
      history
    })

    history = null
  }
})
