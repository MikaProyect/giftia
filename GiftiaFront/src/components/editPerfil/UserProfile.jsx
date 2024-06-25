import { useState, useEffect } from "react";
import { UpdateProfileForm } from "./UpdateProfileForm.jsx";
import "./UserProfile.css";
import "toastify-js/src/toastify.css";
import { getItem } from "../../functions/localStorage.js";
import { EDIT } from "../UI/edit"

function UserProfile() {
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const getUser = () => {
    const userData = getItem('user');
    setUser(userData)
  }

  useEffect(() => {
    getUser()
  }, []);
  return (
    <>
      <div className="profile-form">
          <h1>Perfil de Usuario</h1>
          <p>Nombre: &nbsp;&nbsp;{user?.username}</p><br />
          <p>Correo : &nbsp;&nbsp;{user?.email}</p><br /><br />
          <button className="btnedit" type="button" onClick={handleOpen}> <EDIT onClick={() => handleClose()}  /> Editar Perfil </button>
      </div>
      <div className="btnProfile">
      </div>
      <UpdateProfileForm open={open} close={handleClose} user={user} refresh={getUser}/>
    </>
  );
}

export default UserProfile;
