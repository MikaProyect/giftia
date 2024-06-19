import { Router } from 'express'
import { sendComplaint, sendSuggestion, getData, updateData, deleteData } from '../controllers/rys.controller.js'

const router = Router()

router.post('/suggest', sendSuggestion)

router.post('/complaint', sendComplaint)

router.get('/get-data', getData)

router.put('/update-data/:id', updateData)

router.delete('/delete-data/:id', deleteData)

export default router
