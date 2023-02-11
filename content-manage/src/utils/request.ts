import { STORAGE } from '@/constants'
import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import router from '@/router'
import { Toast } from './toast'

const instance = axios.create({
  baseURL: 'http://localhost:8000',
})

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(STORAGE.TOKEN)
    if (token) (config.headers || {}).Authorization = token
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.headers.authorization) {
      const token = response.headers.authorization
      localStorage.setItem(STORAGE.TOKEN, token)
    }
    return response.data
  },
  (error) => {
    if (error.response.status === 401) {
      Toast.show('登录身份过期')
      setTimeout(() => {
        router.push('/login')
      }, 1000)
    }
    return Promise.reject(error)
  }
)

export const get = async <Request = any, Response = any>(
  url: string,
  params?: Request
) => {
  const res: Response = await instance({
    url,
    params,
  })
  return res
}

export const post = async <Request = any, Response = any>(
  url: string,
  data: Request
) => {
  const res: Response = await instance({
    method: 'post',
    url,
    data,
  })
  return res
}
