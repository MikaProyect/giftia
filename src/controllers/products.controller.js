import { supabase } from "../app.js"

export const getProducts = async (req, res) => {
    try {
        const result = await supabase.from('products').select('*')
        res.status(201).json({ message: result.data });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Error en Supabase api' })
    }
}

export const addProduct = async (req, res) => {

    const { id, tipoProducto, nombre, tag, precio, vendedor, link } = req.body

    try {
        const result = await supabase.from('products').insert({
            tipo: tipoProducto,
            name: nombre,
            tags: tag,
            price: precio,
            seller: vendedor,
            link: link
        }).select()

        res.status(201).json({ message: result.data });

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Error en Supabase api' })
    }

}

export const updateProduct = async (req, res) => {

    const { id } = req.params
    const data = req.body

    try {
        const result = await supabase
            .from('products')
            .update(data)
            .eq('id', id)
            .select()

        res.status(202).json({ message: result });
    
    } catch (error) {
        res.status(400).json({ message: 'Error en Supabase api' })
    }

}

export const deleteProduct = async (req, res) => {

    const { id } = req.params

    try {
        const result = await supabase
            .from('products')
            .delete()
            .eq('id', id)

        res.status(204).json({ message: result });

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Error en Supabase api' })
    }

}
