import { Router } from 'express';
import { OAuth2Client } from 'google-auth-library';
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

function findOrCreateUser(payload) {
  // Aquí puedes buscar o crear el usuario en tu base de datos
  // Este es un ejemplo simple. En una aplicación real, debes consultar tu base de datos.
  return {
    id: payload.sub,
    email: payload.email,
    name: payload.name
  };
}

function generateJwtToken(user) {
  // Aquí deberías implementar la generación de un token JWT
  // Este es un ejemplo simple. En una aplicación real, debes usar una librería como jsonwebtoken.
  return 'fake-jwt-token';
}

export default router;
