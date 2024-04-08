import { supabase } from "../app.js"


export const loginController = async (req, res) => {

    const { user, password } = req.body
    console.log(user, password)


    try {
        const result = await supabase.auth.signInWithPassword({
            email: user,
            password: password
        })

        console.log(result)
        res.status(201).json({ message: result.data.user });

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Error en Supabase api' })

    }
}

export const registerController = async (req, res) => {

    const { username, email, password } = req.body

    try {
        const result = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        const userBDAdded = await supabase.from('users').insert({
            id: result.data.user.id,
            username: username,
            email: email,
            userType: 0,
        })
        console.log(userBDAdded)

        res.status(201).json({ message: result.data.user });

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Error en Supabase api' })
    }
}

export const logoutController = (req, res) => {
    res.send("Cerrando sesion...")
}

export const profileController = (req, res) => {
    res.send("Perfil del usuario")
    
}
