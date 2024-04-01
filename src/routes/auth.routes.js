import { Router } from "express";
import { loginController, logoutController, profileController, registerController } from "../controllers/auth.controller.js";

const router = Router()

router.post('/login', loginController)

router.post('/register', registerController)

router.post('/logout', logoutController)

router.get('/profile', profileController)


export default router