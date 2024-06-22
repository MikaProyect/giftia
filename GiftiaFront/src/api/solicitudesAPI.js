export const solicitudesUserAPI = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/rys/send/my-requests/${id}`)
    const data = await res.json()
    return data.message
    
  } catch (error) {
    return error
  }

}