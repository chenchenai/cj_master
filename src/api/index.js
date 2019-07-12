import axios from 'axios'
import { Message } from 'element-ui'
import qs from 'qs'
import store from '../store'

// 配置API接口地址
let root = 'XXXXXXXXXXXXX'

// 自定义判断元素类型JS
const toType = (obj) => {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// 参数过滤函数
const filterNull = (obj) => {
  for (var key in obj) {
    if (obj[key] === null) {
      delete obj[key]
    }
    if (toType(obj[key]) === 'string') {
      obj[key] = obj[key].trim()
    } else if (toType(obj[key]) === 'object') {
      obj[key] = filterNull(obj[key])
    } else if (toType(obj[key]) === 'array') {
      obj[key] = filterNull(obj[key])
    }
  }
  return obj
}
// 接口处理函数
const Request = (method, url, params, successCb, failureCb) => {
  if (method === 'POST') {
    params = qs.stringify(filterNull(params))
  }
  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: root
  }).then(function (res) {
    if (res.msg === '请重新登录') {
      Message.warning('请重新登陆')
      store.dispatch('clearUserInfo')
    } else {
      if (res.data.code === 200 || res.flag === true) {
        successCb && successCb(res.data)
      } else {
        if (failureCb) {
          failureCb(res)
        } else {
          const { msg } = res
          Message.warning(msg || '系统错误')
        }
      }
    }
  }).catch(function (res) {
    console.log(res)
    Message.warning('系统错误')
  })
}

/**
 * 封装 get/post 请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get (url, params, success, failure) {
  return Request('GET', url, params, success, failure)
}
export function post (url, params, success, failure) {
  return Request('POST', url, params, success, failure)
}
// 导出root地址
export function rootAddress () {
  return root
}
