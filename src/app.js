import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import chatRoutes from './routes/chat.routes.js'
import authRoutes from './routes/auth.routes.js'
import productsRoutes from './routes/products.routes.js'
import adminRoutes from './routes/admin.routes.js'
import rycRoutes from './routes/ryc.routes.js'

dotenv.config()
const app = express()

// Middlewares
app.use(cors({
  origin: '*'
}))
app.use(morgan('dev'))
app.use(express.json())

// Rutas
app.use('/api', authRoutes)
app.use('/api', chatRoutes)
app.use('/api', productsRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/ryc/send', rycRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Giftia API' })
})

// Esto es un manejador de errores, en coso de que algo falla, se manda un JSON con el tipo de error.
app.use((err, req, res, send, next) => {
  res.status(500).json({
    status: 'error',
    message: err.message
  })
})

// Supabase
export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY)

// SB Admin
export const supabaseAdmin = createClient(process.env.SUPABASE_URL, process.env.SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export default app
