import { useEffect, useState } from 'react'
import './modal-ag-ed.css'

function EditProducts ({ show, product, windowClose }) {
  const [formData, setFormData] = useState({
    id: '',
    tipo: '',
    name: '',
    price: '',
    tags: '',
    seller: '',
    link: ''
  })
  const [visible, setVisible] = useState(false)

  const onClose = () => {
    windowClose()
    setVisible(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { id, name, tags, price, seller, link, tipo } = formData
    const editProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/products/update/${id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              tipo,
              name,
              tags,
              price,
              seller,
              link
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
      setFormData(product)
    } else {
      setVisible(false)
      setFormData({})
    } 
  }, [show])

  return (
    <>
      { visible && (
        <div className="edit-product-form">
        <form id="EditProductos" onSubmit={onSubmit}>
          <h1 className="tituloEditPr">Editar Productos</h1>
  
          <div className="form-group">
            <label htmlFor="tipo">Tipo:</label>
            <input
              type="text"
              id="tipo"
              name="tipo"
              placeholder="Tecnología"
              value={formData.tipo}
              onChange={handleInputChange}
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Audífonos"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="tags">Tags:</label>
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="audio, musica, tecnología"
              value={formData.tags}
              onChange={handleInputChange}
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="price">Precio:</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="4990"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="seller">seller:</label>
            <input
              type="text"
              id="seller"
              name="seller"
              placeholder="Tiendita Audio"
              value={formData.seller}
              onChange={handleInputChange}
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="link">Link de la tienda:</label>
            <input
              type="url"
              id="link"
              name="link"
              placeholder="https://..."
              value={formData.link}
              onChange={handleInputChange}
            />
          </div>
  
          <div className="form-group">
            <button type="submit">Guardar</button>
          </div>
  
          <div>
            <button onClick={() => onClose()} >Cerrar</button>
          </div>
        </form>
      </div>

      )}
    </>
  )
}

export { EditProducts }
