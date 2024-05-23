import { useEffect, useState } from 'react'

function EditUser ({ show, Close, data }) {
    const [visible, setVisible] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        tipo: ''
    })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const onClose = () => {
    Close()
    setVisible(false)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { id, username, email, role } = formData
    console.log(username)
    const editProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/admin/update-user`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                username,
                email,
                role
            })
          }
        )
        const data = await res.json()
        console.log(data)
      } catch (error) {
        console.log('Error en actualizar', error)
      }
    }
    editProduct()
  }
  useEffect(() => {
    if (show) {
      setVisible(true)
      setFormData(data)
    } else {
      setVisible(false)
      setFormData({})
    }
  }, [show])

  return (
    <>
        {visible && (
        <div className="edit-product-form">
            <form id="EditUsers" onSubmit={onSubmit}>
            <h1 className="tituloEditPr">Editar Usuario</h1>

                <div className="form-group">
                <label htmlFor="username">Nombre:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                />
                </div>

                <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                </div>

                <div className="form-group">
                <label htmlFor="role">Tipo:</label>
                <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                />
                </div>

                <div className="form-group">
                    <button type="submit">Guardar</button>
                </div>
            </form>
            <div>
                <button onClick={() => onClose()} >cerrar</button>
            </div>
        </div>
      )}
    </>
  )
}

export { EditUser }
