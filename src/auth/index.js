import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const secret = process.env.SECRET_PSW

export const signIn = (id) => {
  const token = jwt.sign({ id: id }, secret, {
    expiresIn: '24h'
  })
  return token
}

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({
      status: '401',
      message: 'No authorization header found'
    })
  } else {
    const token = authHeader.split(' ')[1]
    const { id } = req.body
    try {
      const decoded = jwt.verify(token, secret)
      if (id === decoded.id) {
        next()
      } else {
        return res.status(401).json({
          status: '401',
          message: 'Token invalid'
        })
      }
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          status: '401',
          message: 'Token expired'
        })
      } else {
        return res.status(401).json({
          status: '401',
          message: 'Token invalid'
        })
      }
    }
  }
}
