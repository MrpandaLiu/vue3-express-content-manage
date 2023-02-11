import { CommonRes } from '@/types/request'
import { post } from '@/utils/request'

interface LoginRequest {
  username: string
  password: string
}

interface LoginResponse {
  username: string
  password: string
  nickName: string
}

export const login = async (data: LoginRequest) => {
  return post<LoginRequest, CommonRes<LoginResponse>>('/user/login', data)
}
