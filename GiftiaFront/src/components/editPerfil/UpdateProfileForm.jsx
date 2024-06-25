import "./UpdateProfile.css";
import "toastify-js/src/toastify.css";
import { useEffect, useState } from "react";
import DialogTemplate from "../DialogTemplate";
import { Exit } from "../UI/Exit";
import Toastify from 'toastify-js';
import { getItem, saveItem } from "../../functions/localStorage.js";
import { updateUserAPI } from "../../api/auth";

const UpdateProfileForm = ({ open, close, user, refresh }) => {
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClose = () => {
    close();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email } = formData;
    let userData = getItem('user');
    userData.username = username;
    userData.email = email;
    saveItem('user', userData);

    try {
      const res = await updateUserAPI(formData);
      if (res.status === 200) {
        Toastify({
          text: "Actualización exitosa",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#4BB543",
        }).showToast();
        refresh();
      } else {
        Toastify({
          text: "No se ha podido actualizar con éxito",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#FF0000",
        }).showToast();
      }
    } catch (error) {
      Toastify({
        text: "No se ha podido actualizar con éxito (400)",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#FF0000",
      }).showToast();
    }
  };

  useEffect(() => {
    if (open) {
      setFormData(user);
    }
  }, [open, user]);

  return (
    <>
      {open && (
        <DialogTemplate>
          <div className="update-profile-form">
            <Exit onClick={handleClose} />
            <form className="form-profile" onSubmit={handleSubmit}>
              <div className="form-group">
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
              <div className="form-group">
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
              <button className="btn-update" type="submit">Actualizar Perfil</button>
            </form>
          </div>
        </DialogTemplate>
      )}
    </>
  );
};

export { UpdateProfileForm };
