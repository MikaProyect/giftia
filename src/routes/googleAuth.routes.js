import { Router } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { supabase } from '../app.js'
import dotenv from 'dotenv';

dotenv.config();
const router = Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google-login', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];

    // Aquí puedes buscar al usuario en tu base de datos o registrarlo si no existe
    let user = await findOrCreateUser(payload);

    if (user) {
      const jwtToken = generateJwtToken(user); // Genera un token JWT para tu aplicación
      res.json({ success: true, user: user, token: jwtToken });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: 'Invalid token' });
  }
});

router.get('/google-login2', async (req, res) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
    if (error) {
      console.log(error)
      return res.status(400).json({ success: false, message: error.message });
    }
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.log(error)
      return res.status(400).json({ success: false, message: error.message });
  }
});

router.get('/google/get-session', async (req, res) => {
  try {  
  
  
  const { data, error } = await supabase.auth.getUserIdentities()
  console.log(data)
  if (error) {
    console.log(error)
    return res.status(400).json({ success: false, message: error.message });
  }
  return res.status(200).json({ success: true, data });
  } catch (error) {
    
  }
});

export default router;
