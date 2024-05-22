import { useEffect, useState } from "react";
import "./UserTable.css"

function UserTable () {
    const [user, setUser] = useState();
    const [idSelect, setIdSelect] = useState();
    const [visible, setVisible] = useState(false);
    const [createVisible, setCreateVisible] = useState(false);

    const onEdit = (data) => {
        setIdSelect(data.id);
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
        setCreateVisible(false);
    };

    const onDelete = async (id) => {
        try {
          const res = await fetch(
            `http://localhost:3000/api/products/delete/${id}`,
            {
              method: "DELETE",
            }
          );
          const updatedUsers = products.filter((prod) => prod.id !== id);
          setUser(updatedUsers);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
    };

    const onCreate = () => {
        setCreateVisible(true);
      };

      useEffect(() => {
        const getUsers = async () => {
          try {
            const res = await fetch("http://localhost:3000/api/admin/get-users");
            const data = await res.json();
            setUser(data.message);
            console.log(user)
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
          <body className="allCont">
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
                    <tr>
                        <td>STOCK</td>
                        <td>Franco Vera</td>
                        <td>franco123@admin.cl</td>
                        <td>3</td>
                        <td><button>Editar</button></td>
                    </tr>
                    <tr>
                        <td>STOCK</td>
                        <td>Kevin Morillas</td>
                        <td>kevin123@admin.cl</td>
                        <td>3</td>
                        <td><button>Editar</button></td>
                    </tr>
                </tbody>
                </table>
                </body>
        </>
      );
    }
    
export { UserTable };