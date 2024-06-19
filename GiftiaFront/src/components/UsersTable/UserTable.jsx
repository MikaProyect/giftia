import { useEffect, useState } from "react";
import "./UserTable.css";
import { EditUser } from "../EditarUsers/EditarUsers";
import { CreateUser } from "../CreateUser/CreateUser";

function UserTable() {
  const [user, setUser] = useState([]);
  const [editVisible, setEditVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [data, setData] = useState({
    username: '',
    email: '',
    role: ''
  });

  const onEdit = (data) => {
    setData(data);
    setEditVisible(true);
  };

  const onCloseEdit = () => {
    setEditVisible(false);
  };

  const onCloseCreate = () => {
    setCreateVisible(false);
  };

  const onDelete = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/delete-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
          }),
        }
      );
      const updatedUsers = user.filter((usr) => usr.id !== id);
      setUser(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const onCreate = () => {
    setCreateVisible(true);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/admin/get-users", {
          method: "GET",
        });
        const data = await res.json();
        setUser(data.message);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getUsers()
  }, []);

  return (
    <>
    <div className="btn-crearUser">
        {editVisible && <EditUser show={editVisible} Close={onCloseEdit} data={data} />}
        <button className="edit-button" onClick={onCreate}>Crear Usuario</button>
        {createVisible && <CreateUser show={createVisible} Close={onCloseCreate} />}
        </div>
      <div className="allCont">
        <table className="tabla-contenedora">
          <thead>
            <tr className="TableRow RowHead">
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Tipo Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user) => (
              <tr className="TableRow" key={user.id}>
                <td className="TableCell">Sin Imagen</td>
                <td className="TableCell">{user.username}</td>
                <td className="TableCell">{user.email}</td>
                <td className="TableCell">{user.role}</td>
                <td className="TableCell">
                  <button className="edit-button" onClick={() => onEdit(user)}>Editar</button>
                  <button className="edit-button" onClick={() => onDelete(user.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export { UserTable };
