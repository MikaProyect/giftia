import React, { useState } from 'react';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { updateProfileAPI } from '../../api/auth.js';

const UpdateProfileForm = ({ user }) => {
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email } = formData;

    const result = await updateProfileAPI(username, email);
    if (result === 'Perfil actualizado exitosamente') {
      Toastify({
        text: 'Perfil actualizado exitosamente',
        duration: 60000, // 60,000 milisegundos = 1 minuto
        close: true,
        gravity: 'bottom',
        position: 'right',
        backgroundColor: '#28a745',
      }).showToast();
    } else {
      Toastify({
        text: 'Error al actualizar el perfil: ' + result,
        duration: 60000, // 60,000 milisegundos = 1 minuto
        close: true,
        gravity: 'bottom',
        position: 'right',
        backgroundColor: '#FF5F6D',
      }).showToast();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Nombre de usuario:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Correo electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Actualizar Perfil</button>
    </form>
  );
};

export default UpdateProfileForm;
