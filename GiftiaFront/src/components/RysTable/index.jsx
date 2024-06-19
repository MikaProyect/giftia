import './RysTable.css'
import { useState, useEffect } from 'react'
import { Loading } from '../UI/Loading'
import { DialogSolve } from './DialogSolve'

import { getRySAPI } from '../../api/adminAuth'

const RysTable = () => {
  const [loading, setLoading] = useState()
  const [open, setOpen] = useState(false)
  const [data, setData] = useState()
  const [itemData, setItemData] = useState()

  const modifyDate = (date) => {
    return new Date(date).toLocaleString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  const modifyData = (id, newStatus, newResponse) => {
    // Modifica los datos de la tabla luego que que se hayan enviado los datos a la API
    const newData = data.map((item) => {
      console.log(item.id)
      if (item.id === id) {
        return {
          ...item,
          status: newStatus,
          response: newResponse
        }
      }
      return item
    })
    setData(newData)
  }

  const openDialog = (item) => {
    setOpen(true)
    setItemData(item)
  }

  const closeDialog = () => {
    setOpen(false)
  }

  const getDataRyS = async () => {
    setLoading(true)
    const data = await getRySAPI()
    setData(data)
    setLoading(false)
  }

  useEffect(() => {
    getDataRyS()
  }, [])
  return (
    <>
      <Loading open={loading} />

      <div className='TableContainer'>
        <table className='Table'>
          <thead>
            <tr className='TableRow RowHead'>
              <th className='TableCell'>Categoría</th>
              <th className='TableCell'>Titulo</th>
              <th className='TableCell'>Usuario</th>
              <th className='TableCell'>Fecha</th>
              <th className='TableCell'>Estado</th>
              <th className='TableCell'>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {data && data.map((item) => (
              <tr className='TableRow RowBody' key={item.id}>
                <td className='TableCell'>{item.category}</td>
                <td className='TableCell'>{item.type}</td>
                <td className='TableCell'>{item.usuario || 'User'}</td>
                <td className='TableCell'>{modifyDate(item.fecha)}</td>
                <td className='TableCell'>{item.status}</td>
                <td className='TableCell'>
                  <button className='solveBtn' onClick={() => openDialog(item)}>Ver</button>
                  <button className='solveBtn'>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1>Pagination</h1>
        </div>
      </div>
      <DialogSolve
        open={open}
        close={closeDialog}
        item={itemData}
        modifyData={modifyData}
      />
    </>
  )
}

export { RysTable }
