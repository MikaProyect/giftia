import pkg from 'pg';
import dotenv from 'dotenv'

const { Client } = pkg
dotenv.config()

const clientDB = new Client({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

export default clientDB;