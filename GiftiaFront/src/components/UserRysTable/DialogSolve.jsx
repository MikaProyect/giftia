import { useEffect, useState } from 'react';
import { Exit } from '../UI/Exit'
import { Toast } from '../UI/Toast'

import { Status } from '../UI/Status'

import DialogTemplate from '../DialogTemplate'

const DialogSolve = ({ open, close, item }) => {
  const [response, setResponse] = useState('');

  const handleClose = () => {
    setResponse('Aún no respondido')
    close()
  }

  useEffect(() => {
    // Actualiza el estado con el estado seleccionado
    if (item) {
      if (item.response) {
        setResponse(item.response);
      } else {
        setResponse('Aún no respondido');
      }
    }
  }, [open]);

  return (
    <>
      {open && (
        <DialogTemplate>
          <div className='DialogHeader'>
            <Exit onClick={() => handleClose()} />
          </div>
          <div className='DialogBody'>
            <div className="ContContainer">
              <p>{response}</p>
            </div>
            <Status status={item.status} />
            <div className="BtnCont">
              <button className='solveBtn' onClick={() => handleClose()}>Cerrar</button>
            </div>
          </div>
        </DialogTemplate>
      )}
    </>
  )
}

export { DialogSolve }
