import React, { useState } from 'react';
import './CreateUser.css';
import { createUserAPI } from '../../api/adminAuth.js';

function CreateUser() {
    const [formData, setFormData] = useState({
        user_username: '',
        user_email: '',
        user_password: '',
        user_role: ''
    });

    const [showError, setShowError] = useState(false);
    const [error, setError] = useState('');

    const onCloseMessage = () => {
        setShowError(false);
        setError('');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const { user_username, user_email, user_password, user_role } = formData;
        const data = await createUserAPI(user_username, user_email, user_password, user_role);
        if (data.status === '500') {
            console.log(data.message)
            setError(data.message);
            setShowError(true);
        } else {
            window.location.reload();
        }
    };

    return (
        <div className="edit-product-form">
            <form id="CreateUsers" onSubmit={onSubmit}>
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
                    <select
                        id="user_role"
                        name="user_role"
                        value={formData.user_role}
                        onChange={handleInputChange}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
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
                {showError && (
                    <p className="error" onClick={onCloseMessage}>{error}</p>
                )}
                <div className="form-group">
                    <button type="submit">Guardar</button>
                </div>
            </form>
        </div>
    );
}

export { CreateUser };
