import { supabase } from "../app.js";
import { m_getData, m_getDataByUser } from "../schemas/rys.schema.js";

export const sendSuggestion = async (req, res) => {
  // Para enviar datos aqui: http://localhost:3000/api/ryc/send/suggest
  // Logica para enviar una sugerencia a la base de datos

  try {
    const { category, type, content, user_id } = req.body;

    if (!category || !type || !content) {
      return res
        .status(400)
        .json({ success: false, message: "Uno de los datos es nulo" });
    }
    console.log("Datos recibidos en sendSuggestion:", req.body);
    const { data, error } = await supabase
      .from("rys")
      .insert([{ category, type, content, user_id }]);

    if (error) throw error;
    res.status(200).json({ sucess: true, data });
  } catch (error) {
    res.status(500).json({ sucess: false, message: error.message });
  }
};

export const sendComplaint = async (req, res) => {
  // Para enviar datos aqui: http://localhost:3000/api/ryc/send/complaint
  // Logica para enviar un reclamo a la base de datos

  try {
    const { category, type, content, user_id } = req.body;
    if (!category || !type || !content) {
      return res
        .status(400)
        .json({ success: false, message: "Uno de los datos es nulo" });
    }

    console.log("Datos recibidos en sendComplaint:", req.body);
    const { data, error } = await supabase
      .from("rys")
      .insert([{ category, type, content, user_id }]);

    if (error) throw error;
    res.status(200).json({ sucess: true, data });
  } catch (error) {
    res.status(500).json({ sucess: false, message: error.message });
  }
};

export const getData = async (req, res) => {
  try {
    const data = await m_getData();

    return res.status(200).json({
      status: 200,
      message: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
      status: 500,
      message: "Error en BD",
    });
  }
};

export const getDataByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await m_getDataByUser(id);

    return res.status(200).json({
      status: 200,
      message: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
      status: 500,
      message: "Error en BD",
    });
  }
};

export const updateData = async (req, res) => {
  const { id } = req.params;
  const { status, response } = req.body;

  try {
    const { data, error } = await supabase
      .from("rys")
      .update({
        status: status,
        response: response,
      })
      .eq("id", id)
      .select();

    if (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }

    if (data) {
      return res.status(200).json({
        status: 200,
        message: data,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error en supabase",
    });
  }
};

export const deleteData = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("rys")
      .update({
        is_deleted: true,
      })
      .eq("id", id)
      .select();

    if (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }

    if (data) {
      return res.status(200).json({
        status: 200,
        message: "Eliminado con éxito",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error en supabase",
    });
  }
};
