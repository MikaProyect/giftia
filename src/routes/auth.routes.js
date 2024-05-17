import { Router } from 'express'
import { loginController, logoutController, profileController, registerController, adminVerif, userStatus } from '../controllers/auth.controller.js'

const router = Router()

router.post('/login', loginController)

router.post('/register', registerController)

router.post('/logout', logoutController)

router.get('/profile', profileController)

router.post('/admin/verif', adminVerif)

router.get('/user/status', userStatus)

export default router
