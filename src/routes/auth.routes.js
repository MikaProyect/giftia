import { Router } from 'express'
import { loginController, logoutController, registerController, userProfile, updateProfileController} from '../controllers/auth.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { loginSchema, registerSchema,  updateProfileSchema  } from '../schemas/auth.schema.js'

const router = Router()

router.post('/login', validateSchema(loginSchema), loginController)

router.post('/register', validateSchema(registerSchema), registerController)

router.post('/logout', logoutController)

router.get('/user/profile', userProfile)

router.post('/user/update-profile', validateSchema(updateProfileSchema), updateProfileController);


export default router
