import { supabase } from '../app.js'

export const loginController = async (req, res) => {
  const { email, password } = req.body

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      return res.status(500).json({
        error: error.message,
        status: 500,
        message: 'Error en Supabase api'
      })
    } else {
      return res.status(201).json({
        error: null,
        status: 201,
        message: {
          id: data.user.id,
          username: data.user.user_metadata.display_name,
          email: data.user.email,
          role: data.user.app_metadata.role || 'user'
        }
      })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Error en Supabase api' })
  }
}

export const registerController = async (req, res) => {
  const { username, email, password } = req.body

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: username
        }
      }
    })

    if (error) {
      console.log(error)
      return res.status(400).json({
        error: error.message,
        status: 400,
        message: 'Error en Supabase api'
      })
    } else {
      return res.status(201).json({
        error: null,
        status: 201,
        message: {
          id: data.user.id,
          username: data.user.user_metadata.display_name,
          email: data.user.email,
          role: 'user'
        }
      })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Error en Supabase api' })
  }
}

export const logoutController = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut()
    console.log(error)
    return res.status(500).json({ error })
  } catch (error) {
    console.log(error)
  }
}

export const userProfile = async (req, res) => {
  const { data } = await supabase.auth.getSession()
  if (data.session === null) {
    return res.status(400).json({
      error: null,
      status: 400,
      message: 'user not logged'
    })
  } else {
    return res.status(200).json({
      error: null,
      status: 200,
      message: {
        id: data.session.user.id,
        username: data.session.user.user_metadata.display_name,
        email: data.session.user.email,
        role: data.session.user.app_metadata.role || 'user'
      }
    })
  }
}



export const updateProfileController = async (req, res) => {
  const { username, email } = req.body;
  const { data: session } = await supabase.auth.getSession()

  if (!session) {
    return res.status(401).json({ message: 'No autorizado' })
  }

  try {
    const { data, error } = await supabase.auth.updateUser({
      email,
      data: { display_name: username }
    });

    if (error) {
      return res.status(500).json({ message: error.message })
    }

    return res.status(200).json({ message: 'Perfil actualizado exitosamente' })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error en Supabase api' })
  }
}
