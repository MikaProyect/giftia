import { useEffect, useState } from "react";
import { EditProducts } from "../EditProducts/EditProducts";
import { CreateProducts } from "../CreateProducts/CreateProducts";
import "./ProductsTable.css";

function ProductsTable() {
  const [products, setProducts] = useState([]);
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res = await fetch(
        `http://localhost:3000/api/products/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      const updatedProducts = products.filter((prod) => prod.id !== id);
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const onCreate = () => {
    setCreateVisible(true);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products/get");
        const data = await res.json();
        setProducts(data.message);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
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
        <table className="default">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Tags</th>
              <th>Vendedor</th>
              <th>Enlace</th>
              <th></th>
            </tr>
          </thead>

          <tbody className="product-cont">
            {products.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.tipo}</td>
                <td>{prod.name}</td>
                <td>{prod.price}</td>
                <td>{prod.tags}</td>
                <td>{prod.seller}</td>
                <td>{prod.link}</td>
                <td>
                  <button className="editeli" onClick={() => onEdit(prod)}>
                    Editar
                  </button>
                  <button className="editeli" onClick={() => onDelete(prod.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {createVisible && <CreateProducts />}
          {visible && <EditProducts idProd={idSelect} />}

          {createVisible && (
            <button className="agre-cerrar" onClick={() => onClose()}>
              Cerrar
            </button>
          )}
          {visible && (
            <button className="edit-cerrar" onClick={() => onClose()}>
              Cerrar
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export { ProductsTable };
