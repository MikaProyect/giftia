import dotenv from 'dotenv';
import app from "./app.js"

dotenv.config();
const PORT = process.env.PORT

app.listen(PORT)
console.log("Server on port", PORT)
console.log ("HOLIII")