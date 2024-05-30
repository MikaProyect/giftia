import { supabase } from '../app.js'

export const sendSuggestion = async (req, res) => {
  // Para enviar datos aqui: http://localhost:3000/api/ryc/send/suggest
  // Logica para enviar una sugerencia a la base de datos

  try {
    const { category, type, content } = req.body
    
    if(!category || !type || !content) {
      return res.status(400).json({success: false, message: "Uno de los datos es nulo"});
    }
    console.log('Datos recibidos en sendSuggestion:', req.body)
    const { data, error } = await supabase
      .from('ryc')
      .insert([{ category, type, content }])

    if (error) throw error
    res.status(200).json({ sucess: true, data })
  } catch (error) {
    res.status(500).json({ sucess: false, message: error.message })
  }
}

export const sendComplaint = async (req, res) => {
  // Para enviar datos aqui: http://localhost:3000/api/ryc/send/complaint
  // Logica para enviar un reclamo a la base de datos

  try {
    const { category, type, content } = req.body
    if(!category || !type || !content) {
      return res.status(400).json({success: false, message: "Uno de los datos es nulo"});
    }
    
    console.log('Datos recibidos en sendComplaint:', req.body)
    const { data, error } = await supabase
      .from('ryc')
      .insert([{ category, type, content }])

    if (error) throw error
    res.status(200).json({ sucess: true, data })
  } catch (error) {
    res.status(500).json({ sucess: false, message: error.message })
  }
}
