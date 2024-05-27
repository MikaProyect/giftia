import { useEffect, useState } from 'react';
import './EditarUsers.css';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

function EditUser({ show, Close, data }) {
    const [visible, setVisible] = useState(true);
    const [formData, setFormData] = useState({
        id: '',
        username: '',
        email: '',
        role: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const onClose = () => {
        Close();
        setVisible(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { id, username, email, role } = formData;
        const editUser = async () => {
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
                );
                const data = await res.json();
                if (res.status !== 200) {
                    Toastify({
                        text: data.message || 'Error en actualizar',
                        duration: 60000, // 60,000 milisegundos = 1 minuto
                        close: true,
                        gravity: "bottom",
                        position: "right",
                        backgroundColor: "#FF5F6D"
                    }).showToast();
                } else {
                    // Puedes agregar aquí lógica para actualizar la UI o mostrar un mensaje de éxito
                }
            } catch (error) {
                Toastify({
                    text: 'Error en actualizar',
                    duration: 60000, // 60,000 milisegundos = 1 minuto
                    close: true,
                    gravity: "bottom",
                    position: "right",
                    backgroundColor: "#FF5F6D"
                }).showToast();
            }
        };
        editUser();
    };

    useEffect(() => {
        if (show) {
            setVisible(true);
            setFormData(data);
        } else {
            setVisible(false);
            setFormData({});
        }
    }, [show, data]);

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
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <button type="submit">Guardar</button>
                        </div>
                    </form>
                    <div>
                        <button onClick={() => onClose()}>Cerrar</button>
                    </div>
                </div>
            )}
        </>
    );
}

export { EditUser };
