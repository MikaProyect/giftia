export const createUserAPI = async (username, email, password, role) => {
    let userType = '';
    if (user_role === 'admin') {
        userType = 'create-admin';
    } else {
        userType = 'create-user';
    }

    try {
        const res = await fetch(
            `http://localhost:3000/api/admin/${userType}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    role,
                    password
                })
            }
        );
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('Error en crear', error);
        return error;
    }
}
