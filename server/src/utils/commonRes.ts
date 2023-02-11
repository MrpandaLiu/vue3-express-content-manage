import { Response } from 'express'
import { Code, CODE_MSG } from './code'
import log from './logger'

interface IOptions {
  message?: string
  code?: Code
}

export function commonRes(res: Response, data: unknown, options?: IOptions) {
  const { statusCode } = res

  const { code, message } = options || {}

  const sendRes = {
    code: code || Code.Success,
    data,
    message: message || CODE_MSG.SUCCESS,
  }

  return res.status(statusCode).send(sendRes)
}

export function errorRes(
  res: Response,
  data?: unknown,
  msg?: string,
  code?: Code
) {
  return commonRes(res, data || {}, {
    code: code || Code.Error,
    message: msg || CODE_MSG.ERROR,
  })
}
