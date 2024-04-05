import { supabase } from "../app.js"

export const addProduct = async (req, res) => {

    const { tipoProducto, nombre, tag, precio } = req.body

    try {
        const result = await supabase.from('products').insert({
            tipo: tipoProducto,
            name: nombre,
            tags: tag,
            price: precio
        }).select()

        res.status(201).json({ message: result.data });

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Error en Supabase api' })
    }

}

export const getProducts =  async (req, res) => {
    try {
        const result = await supabase.from('products').select('*')
        res.status(201).json({ message: result.data });


    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Error en Supabase api' })
    }

}
