import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getEnvs } from './envs'
import cookies from '@/utils/cookies'
import router from '@/router'
import { getBaseUrl } from "@/utils/explain"
import { useUserStore } from '@/store'
import { TOKEN, WHITE_CODE_LIST, LOGIN_ERROR_CODE, GLOBAL_DATA } from '@/config/constant'
class HttpRequest {
  // #baseUrl
  constructor() {
    this.baseUrl = getBaseUrl()
    this.withCredentials = false
    this.timeout = 60 * 60 * 24 * 1000
  }

  getConfig() {
    const config = {
      baseURL: this.baseUrl,
      timeout: this.timeout,
      withCredentials: this.withCredentials,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    }
    return config
  }

  getParams(payload) {
    const { method, data } = payload
    if (['post', 'put', 'patch', 'delete'].indexOf(method) >= 0) {
      payload.Data = data
    } else {
      payload.params = data
      delete payload.Data
    }
    return payload
  }

  checkStatus(status) {
    let errMessage = ''
    switch (status) {
      case 400:
        errMessage = '错误请求'
        break
      case 401:
        errMessage = '未授权，请重新登录'
        break
      case 403:
        errMessage = '拒绝访问'
        break
      case 404:
        errMessage = '请求错误,未找到该资源'
        break
      case 405:
        errMessage = '请求方法未允许'
        break
      case 408:
        errMessage = '请求超时'
        break
      case 500:
        errMessage = '服务器端出错'
        break
      case 501:
        errMessage = '网络未实现'
        break
      case 502:
        errMessage = '网络错误'
        break
      case 503:
        errMessage = '服务不可用'
        break
      case 504:
        errMessage = '网络超时'
        break
      case 505:
        errMessage = 'http版本不支持该请求'
        break
      default:
        errMessage = '连接错误'
    }
    return errMessage
  }

  // 拦截处理
  setInterceptors(instance) {
    const that = this

    // 请求拦截
    instance.interceptors.request.use(
      config => {
        if (!navigator.onLine) {
          ElMessage({
            message: '请检查您的网络是否正常',
            type: 'error',
            duration: 3 * 1000
          })
          return Promise.reject(new Error('请检查您的网络是否正常'))
        }

        //获取当前国际化的语言
        const locale = cookies.get('lang')
        console.log(locale, "语言")
        // config.data = qs.stringify( config.data )
        config.data = {
          Language: locale == 'zh' ? 'zh-CN' : 'en-US',
          Data: config.data
        }

        const token = cookies.get(TOKEN)
        if (token) {
          // config.headers.Authorization = token
          config.data.Token = token
        }

        return config
      },
      error => {
        return Promise.reject(new Error(error))
      }
    )

    // 响应拦截
    instance.interceptors.response.use(
      res => {
        const result = res.data
        const type = Object.prototype.toString.call(result)

        // const $config = res.config

        // 如果是文件流 直接返回
        if (type === '[object Blob]' || type === '[object ArrayBuffer]') {
          return result
        } else {
          console.log('response success:', res)
          const { Code, Data, Message } = result
          if (Code == 0) {
            return Data
          } else {
            ElMessage({
              showClose: true,
              grouping: true,
              message: Message || 'Error',
              type: 'error',
              duration: 3 * 1000
            })
            return Promise.reject(new Error(Message || 'Error'))
            // const isErrorToken = LOGIN_ERROR_CODE.find(item => item.code == Code)
            // const isWhiteCode = WHITE_CODE_LIST.find(item => item.code == Code)

            // const userStore = useUserStore()

            // if (isErrorToken) {
            //   userStore.LOGIN_OUT()
            //   router.push('/login')
            //   window.location.reload()
            // } else if (!isWhiteCode) {
            //   ElMessage({
            //     message: Data.msg || 'Error',
            //     type: 'error',
            //     duration: 3 * 1000
            //   })
            //   return Promise.reject(new Error(Data.msg || 'Error'))
            // } else {
            //   return result
            // }
          }

        }

        return result
      },
      error => {
        if (error && error.response) {
          error.message = that.checkStatus(error.response.status)
        }
        const isTimeout = error.message.includes('timeout')
        ElMessage({
          message: isTimeout ? '网络请求超时' : error.message || '连接到服务器失败',
          type: 'error',
          duration: 2 * 1000
        })
        return Promise.reject(new Error(error.message))
      }
    )
  }

  request(options) {
    const instance = axios.create()
    const baseOpt = this.getConfig()
    const params = Object.assign({}, baseOpt, this.getParams(options))
    this.setInterceptors(instance)
    return instance(params)
  }
}

const http = new HttpRequest()
export default http
