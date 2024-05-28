import { useEffect, useState } from "react";
import { EditProducts } from "../EditProducts/EditProducts";
import { CreateProducts } from "../CreateProducts/CreateProducts";
import "./ProductsTable.css";

function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState();
  const [visible, setVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  const onEdit = (data) => {
    setEditProduct(data);
    setVisible(!visible);
  };

  const onCreate = () => {
    setCreateVisible(!createVisible);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onCreateClose = () => {
    setCreateVisible(false);
  };

  const onDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/products/delete/${id}`, {
        method: "DELETE",
      });
      const updatedProducts = products.filter((prod) => prod.id !== id);
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
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

  // Función para manejar el cambio en el input de búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtrar los productos en base al término de búsqueda
  const filteredProducts = products.filter((prod) => {
    return (
      prod.id.toString().includes(searchTerm.toLowerCase()) ||
      prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.tags.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.seller.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <button onClick={onCreate} id="btn-abrir-agrpr" className="BotonAgrPr">
        Agregar Productos
      </button>
 
      <div className="allCont">
        <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
        />
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
              <th>Imagen</th>
              <th></th>
            </tr>
          </thead>

          <tbody className="product-cont">
            {filteredProducts.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.tipo}</td>
                <td>{prod.name}</td>
                <td>{prod.price}</td>
                <td>{prod.tags}</td>
                <td>{prod.seller}</td>
                <td>
                  <a href={prod.link}>{prod.link}</a>
                </td>
                <td><img src={prod.url} alt="imagen" /></td>
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
          <CreateProducts show={createVisible} windowClose={onCreateClose} />
          <EditProducts show={visible} product={editProduct} windowClose={onClose} />
        </div>
      </div>
    </>
  );
}

export { ProductsTable };
