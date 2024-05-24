import { supabase } from '../app.js'

export const loginController = async (req, res) => {
  const { email, password } = req.body

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      res.status(400).json({
        error: error.message,
        status: 400,
        message: 'Error en Supabase api'
      })
    } else {
      console.log(data)
      res.status(201).json({
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
      res.status(400).json({
        error: error.message,
        status: 400,
        message: 'Error en Supabase api'
      })
    } else {
      res.status(201).json({
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
    res.status(500).json({ error })
  } catch (error) {
    console.log(error)
  }
}

export const profileController = (req, res) => {
  res.send('Perfil del usuario')
}

export const adminVerif = async (req, res) => {
  const { userId } = req.body

  try {
    const result = await supabase
      .from('admins')
      .select('id')
      .eq('id', userId)
    const data = result.data.length
    if (data === 1) {
      res.status(200).json({ message: 'isAdmin' }) // ADMIN
    } else if (data === 0) {
      res.status(404).json({ message: 'noAdmin' }) // NO ADMIN
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Ha ocurrido un error al comunicarse con Supabase' })
  }
}

export const userStatus = async (req, res) => {
  const { data } = await supabase.auth.getSession()
  if (data.session === null) {
    res.status(400).json({
      error: null,
      status: 400,
      message: null
    })
  } else {
    res.status(200).json({
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
