import "./UpdateProfile.css";
import "toastify-js/src/toastify.css";
import { useEffect, useState } from "react";
import DialogTemplate from "../DialogTemplate";
import { Exit } from "../UI/Exit";

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
    close()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email } = formData;
    let userData = getItem('user');
    userData.username = username;
    userData.email = email;
    saveItem('user', userData);
    const res = await updateUserAPI(formData);
    refresh();
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
          <Exit onClick={() => handleClose()} />
          <div className="formContainer">
            <form className="form-profile" onSubmit={handleSubmit}>
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
            <button onClick={handleClose}>Cerrar</button>
          </div>
        </DialogTemplate>
      )}
    </>
  );
};

export { UpdateProfileForm };
