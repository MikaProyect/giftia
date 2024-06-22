import dotenv from 'dotenv'
// eslint-disable-next-line no-unused-vars
import app, { supabase } from './app.js'
import clientDB from './db.js'

dotenv.config()

const PORT = process.env.PORT
const DBPORT = process.env.POSTGRES_PORT

app.listen(PORT)
clientDB.connect()
console.log('Server on port', PORT)
console.log('Database connected', DBPORT)
