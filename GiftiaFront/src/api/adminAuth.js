export const createUserAPI = async (username, email, password, role) => {
  let userType = "";
  if (role === "admin") {
    userType = "create-admin";
  } else {
    userType = "create-user";
  }
  console.log(role);
  console.log(userType);

  try {
    const res = await fetch(`http://localhost:3000/api/admin/${userType}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        role,
        password,
      }),
    });
    const data = await res.json();
    
    if (data.status === 200) {
      return data.message;
    } else {
      return 'Error';
    }
  } catch (error) {
    console.log("Error en crear", error);
    return error;
  }
};

export const getRySAPI = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/rys/send/get-data');
    const data = await res.json();
    return data.message;
  } catch (error) {
    return error;
  }
}

export const updateRySAPI = async (id, newStatus, newResponse) => {
  try {
    const res = await fetch(`http://localhost:3000/api/rys/send/update-data/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: newStatus,
        response: newResponse 
      })
    });
  } catch (error) {
    return error;
  }
}
