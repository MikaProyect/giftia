import "./RysTable.css";
import { useState, useEffect } from "react";
import { Loading } from "../UI/Loading";
import { DialogSolve } from "./DialogSolve";

import { Status } from "../UI/Status";

import { LeftArrow } from "../UI/LeftArrow";
import { RightArrow } from "../UI/RightArrow";
import { Toast } from "../UI/Toast";

import { getRySAPI, deleteRySAPI } from "../../api/adminAuth";

const RysTable = () => {
  const [loading, setLoading] = useState();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [itemData, setItemData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Número de filas por página
  const [filter, setFilter] = useState("");

  const filteredData = data.filter(
    (item) =>
      item.category?.toLowerCase().includes(filter.toLowerCase()) ||
      item.type?.toLowerCase().includes(filter.toLowerCase()) ||
      item.usuario?.toLowerCase().includes(filter.toLowerCase()) ||
      item.status?.toLowerCase().includes(filter.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages);
  };

  const modifyDate = (date) => {
    return new Date(date).toLocaleString("es-ES", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const modifyData = (id, newStatus, newResponse) => {
    // Modifica los datos de la tabla luego que que se hayan enviado los datos a la API
    const newData = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status: newStatus,
          response: newResponse,
        };
      }
      return item;
    });
    setData(newData);
  };

  const openDialog = (item) => {
    setOpen(true);
    setItemData(item);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const onDelete = async (id) => {
    const newData = data.filter((item) => item.id !== id);
    const res = await deleteRySAPI(id);
    console.log(res);
    setData(newData);
    Toast(res);
  };

  const getDifferenceInDays = (date) => {
    const currentDate = new Date();
    const itemDate = new Date(date);
    const diffTime = Math.abs(currentDate - itemDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDataRyS = async () => {
    setLoading(true);
    const data = await getRySAPI();
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    getDataRyS();
  }, []);
  return (
    <>
      <Loading open={loading} />
      <div className="filterContainer">
        <input
          type="text"
          placeholder="Buscar solicitud"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filterSearch"
        />
      </div>
      <div className="TableContainer">
        {data.length > 0 && (
          <>
            <table className="Table">
              <thead>
                <tr className="TableRow RowHead">
                  <th className="TableCell">Categoría</th>
                  <th className="TableCell">Titulo</th>
                  <th className="TableCell">Usuario</th>
                  <th className="TableCell">Fecha</th>
                  <th className="TableCell">Estado</th>
                  <th className="TableCell">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {currentRows.map((item) => {
                  const diffDays = getDifferenceInDays(item.fecha);
                  const isUnansweredFor7Days = diffDays >= 7 && item.status !== "Finalizado";
                  return (
                    <tr className="TableRow RowBody" key={item.id}>
                      <td className="TableCell">{item.category}</td>
                      <td className="TableCell">{item.type}</td>
                      <td className="TableCell">{item.user || "User"}</td>
                      <td
                        className={`TableCell ${isUnansweredFor7Days ? "highlight-date" : ""}`}
                      >
                        {modifyDate(item.fecha)}
                      </td>
                      <td className="TableCell">
                        <Status status={item.status} />
                      </td>
                      <td className="TableCell">
                        <button
                          className="solveBtn"
                          onClick={() => openDialog(item)}
                        >
                          Ver
                        </button>
                        <button
                          className="solveBtn"
                          onClick={() => onDelete(item.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="TablePagination">
              <button
                className="BtnPag"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <LeftArrow />
              </button>

              <span className="custom-color">
                Página {currentPage} de {totalPages}
              </span>

              <button
                className="BtnPag"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <RightArrow />
              </button>
            </div>
          </>
        )}
      </div>

      <DialogSolve
        open={open}
        close={closeDialog}
        item={itemData}
        modifyData={modifyData}
      />
    </>
  );
};

export { RysTable };
