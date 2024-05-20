import { supabase } from '../app.js'

export const isAdmin = async (idUser) => {
  const { data: admin, error } = await supabase
    .from('admins')
    .select('*')
    .eq('id', idUser)
  if (error) {
    console.log(error)
    return 'Error'
  } else {
    if (admin.length === 0) {
      const res = false
      return res
    } else {
      const res = true
      return res
    }
  }
}
