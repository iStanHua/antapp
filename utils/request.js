// utils/request.js

export const BASE_URL = 'https://mall.randream.cn'
export const FILE_BASE_URL = `${BASE_URL}/upload/`
export const API_BASE_URL = `${BASE_URL}/api`

export const AUTH_TOKEN = 'RANDREAM_MALL_TOKEN_WX'

/**
 * 发起网络请
 * @param {String} options.url 发送请求的url
 * @param {Object} options.data 请求的参数，格式为对象类型
 * @param {String} options.type 请求方式，默认为GET，包括OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT方式
 * @param {Object} options.header 设置请求的 header
*/
export function fetch(options) {
  return new Promise((resolve, reject) => {
    my.httpRequest({
      url: API_BASE_URL + options.url,
      data: options.data,
      headers: Object.assign(my.getStorageSync(AUTH_TOKEN) ? { 'Authorization': my.getStorageSync(AUTH_TOKEN) } : {}, options.header),
      method: options.type ? options.type.toUpperCase() : 'GET',
      success(res) {
        if (res.statusCode === 200) {
          resolve(res.data)
        }
        else if (res.statusCode === 403) {
          my.confirm({
            content: '为了更好的体验，此小程序必须授权登录后才能操作，是否确定授权？',
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            success: () => {
              my.navigateTo({
                url: '/pages/auth'
              })
            }
          })
          reject(res.data)
        }
        else {
          console.log(res.data)
          reject(res.data)
        }
      },
      fail(err) {
        reject(err)
        console.log(err)
      },
      complete(res) {
        console.log(res.data)
      }
    })
  })
}

