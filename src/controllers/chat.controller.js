import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

let conversation = [
    { role: 'system', content: 'Eres un asombroso asistente, llamado Stelaris' },
]

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export const sendMessage = async (req, res) => {

    const { userMessage } = req.body
    conversation.push({ role: 'user', content: userMessage })

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: conversation,
            stop: null,
        });

        const botMessage = response.choices[0].message.content

        conversation.push({ role: 'assistant', content: botMessage })
        console.log(conversation)
        res.status(200).json({ message: botMessage });

    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'Error en GPT api' })
    }
}
