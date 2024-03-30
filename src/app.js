import express from 'express'
import morgan from 'morgan'

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res) => {
    res.json({message: "Welcome to Giftia API"})
})

// Esto es un manejador de errores, en coso de que algo falla, se manda un JSON con el tipo de error.
app.use((err, req, res, send, next) => {
    res.status(500).json({
        status: "error",
        message: err.message
    })
})

export default app