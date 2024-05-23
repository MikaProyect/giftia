import { useEffect, useState } from "react";
import "./UserTable.css"
import { EditUser } from "../EditarUsers/EditarUsers";
import { CreateUser } from "../CreateUser/CreateUser";



function UserTable () {
    const [user, setUser] = useState([]);
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({
      username: '',
      email: '',
      role: ''
    });

     const onEdit = (data) => {
      setData(data);
      setVisible(true);
     };

     const onClose = () => {
         setVisible(false);
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
           const updatedUsers = products.filter((prod) => prod.id !== id);
           setUser(updatedUsers);
         } catch (error) {
           console.error("Error fetching products:", error);
         }
     };

    //  const onCreate = () => {
    //      setCreateVisible(true);
    //    };

      useEffect(() => {
        const getUsers = async () => {
          try {
            const res = await fetch("http://localhost:3000/api/admin/get-users", {
              method: "GET",
            });
            const data = await res.json();
            setUser(data.message);
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        };
    
        getUsers()
      }, []);

    return (
        <>
        <button
            onClick={() => onCreate()}
            id="btn-abrir-agrpr"
            className="BotonAgrPr"
          >
            Agregar Productos
          </button>
          <div className="allCont">
            <table className="tabla-contenedora">
              <thead>
                <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Tipo Usuario</th>
                    <th>Tipo Usuario</th>
                </tr>
                </thead>
                <tbody>
                      {user.map((user) => (
                        <tr key={user.id}>
                          <td>STOCK</td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td><button onClick={() => onEdit(user)}>Editar</button></td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
            <EditUser show={visible} Close={onClose} data={data} />
            <CreateUser />
        </>
      );
    }
    
export { UserTable };