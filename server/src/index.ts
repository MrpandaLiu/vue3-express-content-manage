import express from 'express'
import cors from 'cors'
import 'module-alias/register'
import bodyParser from 'body-parser'
import userRouter from './router/user'
import noteRouter from './router/note'
import jwt from './utils/jwt'

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('./upload'))
app.use((req, res, next) => {
  if (req.path === '/user/login') {
    next()
  } else {
    // 拿到请求头中的token
    const token = req.headers.authorization || ''
    // 拆解token
    jwt.verifyToken(token, (err, decode) => {
      // 登录过期 or 篡改token 导致拆解失败
      if (err) res.status(401).send('error token')
      // 拆解成功
      else next()
    })
  }
})
app.use('/user', userRouter)
app.use('/note', noteRouter)

const PORT = 8000

app.listen(PORT, async () => {
  console.log(`App is running at http://localhost:${PORT}`)
})
