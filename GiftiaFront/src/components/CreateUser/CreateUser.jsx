import React, { useState } from 'react'

function CreateUser () {
  const [formData, setFormData] = useState({
    user_username: '',
    user_email: '',
    user_password: '',
    user_role: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { user_username, user_email, user_password, user_role } = formData
    let userType = ''
    if (user_role === 'admin') {
      userType = 'create-admin'
    } else {
      userType = 'create-user'
    }

    const createUser = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/admin/${userType}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user_username,
                email: user_email,
                role: user_role,
                password: user_password
            })
          }
        )
        const data = await res.json()
        console.log(data)
        window.location.reload()
      } catch (error) {
        console.log('Error en crear', error)
      }
    }
    createUser()
  }

  return (
    <div className="edit-product-form">
      <form id="EditProductos" onSubmit={onSubmit}>
        <h1 className="tituloEditPr">Crear un usuario</h1>

        <div className="form-group">
          <label htmlFor="user_username">Nombre:</label>
          <input
            type="text"
            id="user_username"
            name="user_username"
            placeholder="Nombre..."
            value={formData.user_username}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="user_email">Email:</label>
          <input
            type="text"
            id="user_email"
            name="user_email"
            placeholder="user@mail.com"
            value={formData.user_email}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="user_role">Rol:</label>
          <input
            type="text"
            id="user_role"
            name="user_role"
            placeholder="rol"
            value={formData.user_role}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="user_password">Contraseña:</label>
          <input
            type="password"
            id="user_password"
            name="user_password"
            placeholder="********"
            value={formData.user_password}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <button type="submit">Guardar</button>
        </div>
      </form>
    </div>
  )
}

export { CreateUser }
