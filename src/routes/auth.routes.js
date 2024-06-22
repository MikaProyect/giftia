import { Router } from 'express'
import { loginController, logoutController, registerController } from '../controllers/auth.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { loginSchema, registerSchema } from '../schemas/auth.schema.js'

const router = Router()

router.post('/login', validateSchema(loginSchema), loginController)

router.post('/register', validateSchema(registerSchema), registerController)

router.post('/logout', logoutController)

export default router
