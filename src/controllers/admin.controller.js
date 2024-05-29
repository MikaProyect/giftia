import { supabaseAdmin } from '../app.js'

export const getUsers = async (req, res) => {
  console.log(req.body)
  const usersList = []
  try {
    const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers()
  

    for (const user of users) {
      usersList.push({
        id: user.id,
        username: user.user_metadata.display_name,
        email: user.email,
        role: user.app_metadata.role || 'user',
        created_at: user.created_at,
        updated_at: user.updated_at
      })
    }

    if (error) {
      return res.status(500).json({
        status: '500',
        message: error.message
      })
    } else {
      return res.status(200).json({
        status: '200',
        message: usersList
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
}

export const createUser = async (req, res) => {
  const { username, email, password } = req.body
  console.log(username, email, password)
  try {
    const { data: user, error } = await supabaseAdmin.auth.admin.createUser({
      user_metadata: {
        display_name: username
      },
      app_metadata: {
        role: 'user'
      },
      email,
      password,
      email_confirm: true
    })

    if (error) {
      if (error.message === 'Unable to validate email address: invalid format') {
        return res.status(500).json({
          status: '500',
          message: 'Correo no válido'
        })
      } else {
        return res.status(500).json({
          status: 'error in createUser',
          message: error.message
        })
      }
    }

    if (user) {
      return res.status(200).json({
        status: '200',
        message: user
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
}

export const createAdminUser = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const { data: user, error } = await supabaseAdmin.auth.admin.createUser({
      user_metadata: {
        display_name: username
      },
      app_metadata: {
        role: 'admin'
      },
      email,
      password,
      email_confirm: true
    })

    if (error) {
      if (error.message === 'Unable to validate email address: invalid format') {
        return res.status(500).json({
          status: '500',
          message: 'Correo no válido'
        })
      } else {
        return res.status(500).json({
          status: 'error in createUser',
          message: error.message
        })
      }
    }

    if (user) {
      return res.status(200).json({
        status: '200',
        message: user
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
}

export const editUser = async (req, res) => {
  const { id, username, email, role } = req.body

  try {
    const { data: user, error } = await supabaseAdmin.auth.admin.updateUserById(
      id,
      { email, user_metadata: { display_name: username }, app_metadata: { role } }
    )

    if (error) {
      return res.status(500).json({
        status: 'error',
        message: error.message
      })
    }

    if (user) {
      return res.status(200).json({
        status: 'success',
        message: user
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.body

  try {
    const { data: user, error } = await supabaseAdmin.auth.admin.deleteUser(id)

    if (error) {
      return res.status(500).json({
        status: 'error',
        message: error.message
      })
    }

    if (user) {
      return res.status(200).json({
        status: 'success',
        message: user
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
}
