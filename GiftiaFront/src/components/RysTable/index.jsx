import './RysTable.css'
import { Loading } from '../UI/Loading'
import { useState } from 'react'

const RysTable = () => {
  const [loading, setLoading] = useState(true)
    return (
      <>
        <Loading open={loading} />

        <div className='TableContainer'>
          <table className='Table'>
            <thead>
              <tr className='TableRow RowHead'>
                <th className='TableCell'>ID</th>
                <th className='TableCell'>Tipo</th>
                <th className='TableCell'>Titulo</th>
                <th className='TableCell'>Usuario</th>
                <th className='TableCell'>Fecha</th>
                <th className='TableCell'>Estado</th>
                <th className='TableCell'>Acciones</th>
              </tr>
            </thead>

            <tbody>
              <tr className='TableRow'>
                <td className='TableCell'>1</td>
                <td className='TableCell'>1</td>
                <td className='TableCell'>1</td>
                <td className='TableCell'>1</td>
                <td className='TableCell'>1</td>
                <td className='TableCell'>1</td>
                <td className='TableCell'>1</td>
              </tr>

              <tr className='TableRow'>
                <td className='TableCell'>1</td>
                <td className='TableCell'>1</td>
                <td className='TableCell'>1</td>
                <td className='TableCell'>1</td>
                <td className='TableCell'>1</td>
                <td className='TableCell'>1</td>
                <td className='TableCell'>1</td>
              </tr>

              <tr className='TableRow'>
                <td className='TableCell'>1</td>
                <td className='TableCell'>1</td>
                <td className='TableCell'>1</td>
                <td className='TableCell'>1</td>
                <td className='TableCell'>1</td>
                <td className='TableCell'>1</td>
                <td className='TableCell'>1</td>
              </tr>
              
              <tr className='TableRow'>
                <td className='TableCell'>1</td>
                <td className='TableCell'>1</td>
                <td className='TableCell'>1</td>
                <td className='TableCell'>1</td>
                <td className='TableCell'>1</td>
                <td className='TableCell'>1</td>
                <td className='TableCell'>1</td>
              </tr>

            </tbody>
          </table>
          <div>
            <h1>Pagination</h1>
          </div>
        </div>
      </>
    )
}

export { RysTable }
