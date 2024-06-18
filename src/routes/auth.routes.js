import { Router } from 'express'
<<<<<<< HEAD
import { loginController, logoutController, registerController} from '../controllers/auth.controller.js'
=======
import { loginController, logoutController, registerController } from '../controllers/auth.controller.js'
>>>>>>> 76a9b3fe2253ee0d20a25894f9f056a8e2de916e
import { validateSchema } from '../middlewares/validator.middleware.js'
import { loginSchema, registerSchema } from '../schemas/auth.schema.js'

const router = Router()

router.post('/login', validateSchema(loginSchema), loginController)

router.post('/register', validateSchema(registerSchema), registerController)

router.post('/logout', logoutController)

<<<<<<< HEAD

=======
>>>>>>> 76a9b3fe2253ee0d20a25894f9f056a8e2de916e
export default router
