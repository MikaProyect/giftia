const agrupador = document.querySelector('.agrupador')
const linkLogin = document.querySelector('.link-login')
const linkRegistro = document.querySelector('.link-registro')

linkRegistro.addEventListener('click', () => {
  agrupador.classList.add('activo') // Añadir el estado de 'Activo' al agrupador.
})

linkLogin.addEventListener('click', () => {
  agrupador.classList.remove('activo') // Quitar el estado de 'Activo' al agrupador.
})
