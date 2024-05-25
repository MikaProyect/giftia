import { supabaseAdmin } from '../app.js'

export const getUsers = async (req, res) => {
  console.log(req.body)
  const usersList = []
  try {
    const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers()
    console.log(users)

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
      res.status(500).json({
        status: 'error',
        message: error.message
      })
    } else {
      res.status(200).json({
        status: 'success',
        message: usersList
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
}

export const createUser = async (req, res) => {
  const { username, email, password } = req.body
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
      res.status(500).json({
        status: 'error in createUser',
        message: error.message
      })
    }

    if (user) {
      res.status(200).json({
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

export const createAdminUser = async (req, res) => {
  const errors = []
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
      errors.push(error.message)
    }

    if (errors.length === 0) {
      res.status(200).json({
        status: 'success',
        message: user
      })
    } else {
      res.status(500).json({
        status: 'error',
        message: errors
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
      res.status(500).json({
        status: 'error',
        message: error.message
      })
    }

    if (user) {
      res.status(200).json({
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
      res.status(500).json({
        status: 'error',
        message: error.message
      })
    }

    if (user) {
      res.status(200).json({
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
