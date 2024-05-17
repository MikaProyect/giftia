import dotenv from 'dotenv'
// eslint-disable-next-line no-unused-vars
import app, { supabase } from './app.js'

dotenv.config()

const PORT = process.env.PORT

app.listen(PORT)
console.log('Server on port', PORT)
