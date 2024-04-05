import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import chatRoutes from './routes/chat.routes.js'
import authRoutes from './routes/auth.routes.js'

dotenv.config();
const app = express()

//Middlewares
app.use(morgan('dev'))
app.use(express.json())

// Rutas
app.use('/api', authRoutes)
app.use('/api', chatRoutes)

app.get('/', (req, res) => {
    res.json({ message: "Welcome to Giftia API" })
})

// Esto es un manejador de errores, en coso de que algo falla, se manda un JSON con el tipo de error.
app.use((err, req, res, send, next) => {
    res.status(500).json({
        status: "error",
        message: err.message
    })
})

// Supabase
export const client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY)

export default app