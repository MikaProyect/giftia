import { supabase } from '../app.js'
import multer from 'multer'

// Configuración de multer
const storage = multer.memoryStorage()
const upload = multer({ storage })

export const getProducts = async (req, res) => {
  try {
    const result = await supabase.from('products').select('*')
    res.status(201).json({ message: result.data })
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Error en Supabase api' })
  }
}

export const addProduct = async (req, res) => {
  upload.single('file')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message })
    }

    const { tipoProducto, nombre, tag, precio, vendedor, link } = req.body
    const file = req.file

    if (!file) {
      return res.status(400).json({ error: 'No file provided' })
    }

    try {
      // Subir archivo a Supabase Storage
      const resultImage = await supabase
        .storage
        .from('productImages')
        .upload(`${tipoProducto}/${file.originalname}`, file.buffer, {
          cacheControl: '3600',
          upsert: false
        })

      if (resultImage.error) {
        return res.status(400).json({ resultImage: resultImage.error })
      }

      const getProductImage = supabase
        .storage
        .from('productImages')
        .getPublicUrl(`${tipoProducto}/${file.originalname}`)
      const imageURL = getProductImage.data.publicUrl

      if (getProductImage.error) {
        return res.status(400).json({ getProductImage: getProductImage.error })
      }

      const result = await supabase.from('products').insert({
        tipo: tipoProducto,
        name: nombre,
        tags: tag,
        price: precio,
        seller: vendedor,
        link,
        url: imageURL
      }).select()

      if (result.error) {
        return res.status(400).json({ result: result.error })
      }

      res.status(201).json({ message: result.data })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Error en Supabase api', error })
    }
  })
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

    res.status(202).json({ message: result })
  } catch (error) {
    res.status(400).json({ message: 'Error en Supabase api', error })
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params

  try {
    const result = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    res.status(204).json({ message: result })
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Error en Supabase api' })
  }
}
