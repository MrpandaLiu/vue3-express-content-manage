import express from 'express'
import { commonRes, errorRes } from '@/utils/commonRes'
import handleError from '@/utils/handleError'
import { handleUserInfo, handleUserLogin } from '@/controller/user.controller'

const router = express.Router()

/** 用户登录 */
router.post('/login', async (req, res) => {
  const [model, error] = await handleError(handleUserLogin, req, res)
  return error
    ? errorRes(res, {}, JSON.stringify(error))
    : commonRes(res, { model })
})

router.get('/getinfo', async (req, res) => {
  const [model, error] = await handleError(handleUserInfo, req)
  return error
    ? errorRes(res, {}, JSON.stringify(error))
    : commonRes(res, { model })
})

export default router
