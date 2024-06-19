import { useEffect, useState } from 'react';
import { Exit } from '../UI/Exit'

import { updateRySAPI } from '../../api/adminAuth';

import DialogTemplate from '../DialogTemplate'

const StateSelector = ({ selectedState, onSelectState }) => {
  const states = ['Pendiente', 'Finalizado']; // Opciones de estado

  return (
    <select className='StateSelector' value={selectedState} onChange={(event) => onSelectState(event.target.value)}>
      {states.map((state) => (
        <option key={state} value={state}>
          {state}
        </option>
      ))}
    </select>
  );
};

const DialogSolve = ({ open, close, item, modifyData }) => {
  const [inputText, setInputText] = useState('');
  const [selectedState, setSelectedState] = useState('Pendiente');

  const handleClose = () => {
    close()
  }

  const handleChange = (event) => {
    setInputText(event.target.value); // Actualiza el estado con el nuevo texto
  };

  const handleSelectState = (newState) => {
    setSelectedState(newState);
  };

  const handleSend = () => {
    // Enviar el texto (inputText) y el estado seleccionado (selectedState) a la API. Se envía el item ya que se neecsita el id
    updateRySAPI(item.id, selectedState, inputText);
    modifyData(item.id, selectedState, inputText);
    close();
  };

  useEffect(() => {
    // Actualiza el estado con el estado seleccionado
    if (item) {
      handleSelectState(item.status);
      if (item.response) {
        setInputText(item.response);
      } else {
        setInputText('');
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
              <p>{item.content}</p>
            </div>
            <StateSelector selectedState={selectedState} onSelectState={handleSelectState} />
            <textarea
              className="ContInput"
              placeholder="Introduzca una respuesta"
              value={inputText} // Muestra el texto del estado
              onChange={handleChange} // Maneja el cambio del texto
            />
            <div className="BtnCont">
              <button className='solveBtn' onClick={() => handleClose()}>Cerrar</button>
              <button className='solveBtn' onClick={handleSend}>Enviar</button>
            </div>
          </div>
        </DialogTemplate>
      )}
    </>
  )
}

export { DialogSolve }
