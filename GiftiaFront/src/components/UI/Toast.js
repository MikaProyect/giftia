import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

 export const Toast = (msg, type = 'success') => {
  const backgroundColor = type === 'error' ? '#FF5F6D' : '#28a745'; // Rojo para error, verde para éxito

  Toastify({
    text: msg,
    duration: 3000,
    close: true,
    gravity: "bottom",
    position: "center",
    style: {
      background: backgroundColor
    }
  }).showToast();
}
