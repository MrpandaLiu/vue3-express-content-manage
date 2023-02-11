import { Request, Response } from 'express'
import UserService from '@/service/user.service'
import jwt from '@/utils/jwt'

const userService = new UserService()

export const handleUserLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body
  if (!username || !password) {
    throw new Error('提交信息不全')
  }
  const ret = await userService.getUserInfo({
    username,
    password,
  })
  if (ret.length) {
    const payload = {
      username,
    }
    const token = jwt.createToken(payload, '240h')
    res.setHeader('Access-Control-Expose-Headers', 'Authorization')
    res.header('Authorization', token)
    return ret[0]
  } else {
    throw new Error('登录失败')
  }
}

export const handleUserInfo = async (req: Request) => {
  const token = req.headers.authorization || ''
  const { username } = jwt.getPayload(token)
  const ret = await userService.getUserInfo({
    username,
  })
  if (ret.length) {
    return ret[0]
  } else {
    throw new Error('获取用户信息失败')
  }
}
