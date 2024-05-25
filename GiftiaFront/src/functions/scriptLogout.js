import { logoutAPI } from '../api/auth.js'
const salir = document.querySelector(".salir");
salir.addEventListener("click", async () => {
    await logoutAPI();
});