import dotenv from 'dotenv';
import OpenAI from 'openai';
import { supabase } from '../app.js';
import { arr1String, arr2String, arr3String, arr4String, arr5String } from '../BDTest/products.js';

dotenv.config();

const prompt = `Eres una aplicacion que sirve para la búsqueda de regalos, tu trabajo es recibir preferencias y encontrar regalos que coincidan con esas preferencias. Tienes que responder solo en contexto de los regalos. Te llamas GIFTIA. Te daré una base de datos con distintos productos que analizarás para recomendar regalos. Estos tienen un "tag", puedes relacionarlos con las preferencias que te escriban. Debes entregar una lista con productos que cumplan con la busqueda. De esta manera tienes que nombrar cada producto que has elegido: 'Nombre del producto, precio'. Tienes que adaptar el presupuesto en CLP en caso de que te lo mencionen, este es la Base de datos: ${arr1String}, ${arr2String}, ${arr3String}, ${arr4String}, ${arr5String}. Recuerda se breve en tus respuestas pero alegre.`



const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export const sendMessage = async (req, res) => {

    let conversation = [
        { role: 'system', content: prompt },
    ]

    const dataUser = req.body
    const { message, user } = dataUser
    for (let i = 0; i < message.length; i++) {
        conversation.push(message[i])
    }
    console.log(conversation)

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: conversation,
            stop: null,
        });

        const botMessage = response.choices[0].message.content

        conversation.push({ role: 'assistant', content: botMessage })
        console.log(conversation)

        const { data, error } = await supabase
            .from('chat')
            .select('*')
            .eq('user', user);

        if (data && data.length === 0) {
            const bdRes = await supabase.from('chat').insert({
                message: conversation,
                user: user
            }).select()
            
        } else {
            const bdRes = await supabase
                .from('chat')
                .update(dataUser)
                .eq('user', user)
                .select()
        }

        res.status(200).json({ message: botMessage });

    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'Error en GPT api' })
    }
}
