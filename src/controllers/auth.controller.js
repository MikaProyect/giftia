import { supabase } from '../app.js'

export const loginController = async (req, res) => {
  const { email, password } = req.body
  console.log(email, password)

  try {
    const result = await supabase.auth.signInWithPassword({
      email,
      password
    })

    console.log(result)
    res.status(201).json({ message: result.data.user })
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Error en Supabase api' })
  }
}

export const registerController = async (req, res) => {
  const { username, email, password } = req.body

  try {
    const result = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: username
        }
      }
    })

    // Esto es para añadir users a la BD llamada "admins"
    // const userBDAdded = await supabase.from('admins').insert({
    //     id: result.data.user.id,
    //     username: username,
    //     email: email,
    // })
    // console.log(userBDAdded)

    res.status(201).json({ message: result.data.user })
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
  const user = await supabase.auth.getSession()

  res.status(200).json({ message: user.data })
}
