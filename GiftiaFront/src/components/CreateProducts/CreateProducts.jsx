import { useEffect, useState } from 'react'

function CreateProducts ( { show, windowClose } ) {
  const [formData, setFormData] = useState({
    tipo: '',
    nombre: '',
    precio: '',
    tag: '',
    vendedor: '',
    link: '',
    file: '',
    fileName: ''
  })
  const [visible, setVisible] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file,  // Almacenar el archivo en el estado
        fileName: file.name
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const onClose = () => {
    windowClose()
    setVisible(false)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { nombre, tag, precio, vendedor, link, tipo, file, fileName } = formData

    const formDataToSend = new FormData()
    formDataToSend.append('tipoProducto', tipo)
    formDataToSend.append('nombre', nombre)
    formDataToSend.append('tag', tag)
    formDataToSend.append('precio', precio)
    formDataToSend.append('vendedor', vendedor)
    formDataToSend.append('link', link)
    formDataToSend.append('file', file)

    const createProduct = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/products/create', {
          method: 'POST',
          body: formDataToSend
        })
        const data = await res.json()
        console.log(data)
        window.location.reload();
      } catch (error) {
        console.log('Error en crear', error)
      }
    }

    createProduct()
  }

  useEffect(() => {
    if (show) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [show])

  return (
    <>
      { visible && (
        <div className="edit-product-form">
        <form id="EditProductos" onSubmit={onSubmit}>
          <h1 className="tituloEditPr">Agregar Productos</h1>
  
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
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Audífonos"
              value={formData.nombre}
              onChange={handleInputChange}
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="precio">Precio:</label>
            <input
              type="number"
              id="precio"
              name="precio"
              placeholder="4990"
              value={formData.precio}
              onChange={handleInputChange}
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="tag">Tags:</label>
            <input
              type="text"
              id="tag"
              name="tag"
              placeholder="audio,musica,tecnología"
              value={formData.tag}
              onChange={handleInputChange}
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="vendedor">Vendedor:</label>
            <input
              type="text"
              id="vendedor"
              name="vendedor"
              placeholder="Tiendita de Audio"
              value={formData.vendedor}
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
            <label htmlFor="file">Imagen</label>
            <input type="file" id="file" name='file' onChange={handleInputChange} />
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

export { CreateProducts }
