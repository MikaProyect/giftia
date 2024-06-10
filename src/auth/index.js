import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const secret = process.env.SECRET_PSW

export const signIn = (id) => {
  const token = jwt.sign({ id: id }, secret, {
    expiresIn: '1h'
  })
  return token
}

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret)
    return decoded
  } catch (err) {
    return null
  }
}
