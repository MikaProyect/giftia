import { Router } from "express";

const router = Router()

router.post('/chat/send', (req, res) => {
    res.send('Enviando mensaje')
})

export default router