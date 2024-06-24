import { useState, useEffect } from 'react';
import './UserProfile.css';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

function UserProfile({ user }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/user/update-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        Toastify({
          text: 'Perfil actualizado exitosamente',
          duration: 60000,
          close: true,
          gravity: 'bottom',
          position: 'right',
          backgroundColor: '#28a745',
        }).showToast();
      } else {
        Toastify({
          text: data.message || 'Error al actualizar el perfil',
          duration: 60000,
          close: true,
          gravity: 'bottom',
          position: 'right',
          backgroundColor: '#FF5F6D',
        }).showToast();
      }
    } catch (error) {
      Toastify({
        text: 'Error en la solicitud: ' + error.message,
        duration: 60000,
        close: true,
        gravity: 'bottom',
        position: 'right',
        backgroundColor: '#FF5F6D',
      }).showToast();
    }
  };

  return (
    <div className="profile-form">
      <form onSubmit={handleSubmit}>
        <h1>Perfil de Usuario</h1>

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
          <button type="submit">Guardar</button>
        </div>
      </form>
    </div>
  );
}

export default UserProfile;
