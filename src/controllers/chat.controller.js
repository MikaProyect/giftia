import dotenv from 'dotenv';
import OpenAI from 'openai';
import { arr1String, arr2String, arr3String, arr4String, arr5String } from '../BDTest/products.js';

dotenv.config();

const prompt = `Eres una aplicacion que sirve para la búsqueda de regalos, tu trabajo es recibir preferencias y encontrar regalos que coincidan con esas preferencias. Tienes que responder solo en contexto de los regalos. Te llamas GIFTIA. Te daré una base de datos con distintos productos que analizarás para recomendar regalos. Estos tienen un "tag", puedes relacionarlos con las preferencias que te escriban. Debes entregar una lista con productos que cumplan con la busqueda. De esta manera tienes que nombrar cada producto que has elegido: 'Nombre del producto, precio'. Tienes que adaptar el presupuesto en CLP en caso de que te lo mencionen, este es la Base de datos: ${arr1String}, ${arr2String}, ${arr3String}, ${arr4String}, ${arr5String}.`

let conversation = [
    { role: 'system', content: prompt },
]

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export const sendMessage = async (req, res) => {

    const { userMessage } = req.body
    conversation.push({ role: 'user', content: userMessage })

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4-0125-preview',
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
