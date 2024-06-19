import { useEffect, useState } from 'react';
import './EditarUsers.css';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

function EditUser({ show, Close, data }) {
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
                if (res.ok) {
                    Toastify({
                        text: 'Usuario actualizado exitosamente',
                        duration: 60000,
                        close: true,
                        gravity: "bottom",
                        position: "right",
                        backgroundColor: "#28a745"
                    }).showToast();
                    Close();
                } else {
                    Toastify({
                        text: data.message || 'Error al actualizar el usuario',
                        duration: 60000,
                        close: true,
                        gravity: "bottom",
                        position: "right",
                        backgroundColor: "#FF5F6D"
                    }).showToast();
                }
            } catch (error) {
                Toastify({
                    text: 'Error en la solicitud: ' + error.message,
                    duration: 60000,
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
            setFormData(data);
        }
    }, [show, data]);

    if (!show) return null;

    return (
        <div className="modal">
            <div className="modal-content">
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
                    <button type="button" onClick={onClose}>Cerrar</button>
                </div>
            </div>
        </div>
    );
}

export { EditUser };
