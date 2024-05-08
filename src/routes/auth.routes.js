import { Router } from "express";
import { loginController, logoutController, profileController, registerController, stateController, userStatus } from "../controllers/auth.controller.js";

const router = Router()

router.post('/login', loginController)

router.post('/register', registerController)

router.post('/logout', logoutController)

router.get('/profile', profileController)

router.post('/user/state', stateController)

router.get('/user/status', userStatus)

export default router