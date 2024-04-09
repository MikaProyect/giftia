import React, { useState } from 'react';

function CreateProducts() {
    const [formData, setFormData] = useState({
        tipo:  '',
        nombre: '',
        precio: '',
        tag: '',
        vendedor: '',
        link: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Aquí puedes hacer lo que quieras con los datos almacenados
        const { nombre, tag, precio, vendedor, link, tipo } = formData
        console.log(nombre)
        const editProduct = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/products/create", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tipoProducto: tipo,
                        nombre: nombre,
                        tag: tag,
                        precio: precio,
                        vendedor: vendedor,
                        link: link
                    })
                })
                const data = await res.json()
                console.log(data)

            } catch (error) {
                console.log("Error en actualizar", error)
            }

        }

        editProduct()
    };

    return (
        <div className="edit-product-form">
            <form id="EditProductos" onSubmit={onSubmit}>
                <h1 className="tituloEditPr">Agregar Productos</h1>


                <div className="form-group">
                    <label htmlFor="tipo">Tipo:</label>
                    <input type="text" id="tipo" name="tipo" placeholder="Vela aromática" value={formData.tipo} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" placeholder="Vela aromática" value={formData.nombre} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="precio">Precio:</label>
                    <input type="number" id="precio" name="precio" placeholder="4990" value={formData.precio} onChange={handleInputChange} />
                </div>
                
                <div className="form-group">
                    <label htmlFor="tag">Tags:</label>
                    <input type="text" id="tag" name="tag" placeholder="845" value={formData.tag} onChange={handleInputChange} />
                </div>


                <div className="form-group">
                    <label htmlFor="vendedor">Vendedor:</label>
                    <input type="text" id="vendedor" name="vendedor" placeholder="Tiendita de velas" value={formData.vendedor} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="link">Link de la tienda:</label>
                    <input type="text" id="link" name="link" placeholder="https://..." value={formData.link} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <button type="submit">Guardar</button>
                </div>
            </form>
        </div>
    )
}

export { CreateProducts }
