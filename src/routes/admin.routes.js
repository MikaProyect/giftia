import { Router } from 'express'
import { createAdminUser, createUser, deleteUser, editUser, getUsers } from '../controllers/admin.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { createUserSchema } from '../schemas/auth.schema.js'

const router = Router()

router.get('/get-users', getUsers)

router.post('/create-user', validateSchema(createUserSchema), createUser)

router.post('/create-admin', validateSchema(createUserSchema), createAdminUser)

router.post('/update-user', editUser)

router.post('/delete-user', deleteUser)

export default router
