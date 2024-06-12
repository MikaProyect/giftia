export const loginAPI = async (email, password) => {
  try {
    const res = await fetch('http://localhost:3000/api/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ 
						email: email,
						password: password
					})
				})
				const data = await res.json()
        if (data.status === '500' || data.status === '400') {
          return 'Email o contraseña incorrecta'
        } else {
          return data.message
        }
  } catch (error) {
    console.log("Ha ocurrido un error inesperado: ", error);
    return 'error'
    
  }
};

export const registerAPI = async (user, email, password) => {
  try {
    const res = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        username: user,
        email: email,
        password: password
      })
    })
    const data = await res.json()
    return data.message

  } catch (error) {
    console.log("Ha ocurrido un error inesperado: ", error);
    return err = 'error'
  }
};

export const logoutAPI = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/logout", {
        method: "POST"
    });
    const data = await res.json();
    if (data.error === null) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = "/";
    }
  } catch (error) {
    console.log("Ha ocurrido un error: ", error);
  }
};

export const profileAPI = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/user/profile", {
        method: "GET"
    });
    const data = await res.json();
    return data.message;
  } catch (error) {
    console.log("Ha ocurrido un error: ", error);
    return 'error'
  }
};

export const verifyUserAPI = async (id) => {
  const rawToken = localStorage.getItem('token');
  const token = rawToken ? rawToken.replace(/^"|"$/g, '') : null; // Eliminar comillas si existen
  try {
    console.log()
    const res = await fetch("http://localhost:3000/api/admin/verify-user", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: id })
    });
    const data = await res.json();
    return data.message;
  } catch (error) {
    return 'error';
  }
}
