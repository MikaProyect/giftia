import { Router } from 'express'
import { createAdminUser, createUser, deleteUser, editUser, getUsers } from '../controllers/admin.controller.js'

const router = Router()

router.get('/get-users', getUsers)

router.post('/create-user', createUser)

router.post('/create-admin', createAdminUser)

router.post('/update-user', editUser)

router.post('/delete-user', deleteUser)

export default router
