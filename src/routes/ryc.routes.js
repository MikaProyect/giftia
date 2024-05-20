import { Router } from 'express'
import { sendComplaint, sendSuggestion } from '../controllers/ryc.controller.js'

const router = Router()

router.post('/suggest', sendSuggestion)

router.post('/complaint', sendComplaint)

export default router
