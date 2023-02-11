import jwt from 'jsonwebtoken'

const secret = 'TEST&SECRET'

class JWT {
  createToken(payload: Record<string, any>, time: string) {
    const token = jwt.sign(payload, secret, {
      expiresIn: time,
    })
    return token
  }

  verifyToken(token: string, callback: (err: any, decode: any) => void) {
    jwt.verify(token, secret, callback)
  }

  getPayload(token: string) {
    return jwt.verify(token, secret) as Record<string, any>
  }
}

const token = new JWT()

export default token
