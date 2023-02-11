import { CommonRes } from '@/types/request'
import { get } from '@/utils/request'

interface LoginResponse {
  username: string
  password: string
  nickName: string
}

export const getUserInfo = async () => {
  return get<any, CommonRes<LoginResponse>>('/user/getinfo')
}
