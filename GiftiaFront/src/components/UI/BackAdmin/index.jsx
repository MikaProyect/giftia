import { useEffect, useState } from "react"
import { getItem } from "../../../functions/localStorage"

const BackAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  
  const userVerify = () => {
    const user = getItem('user')
    if (user.role === 'admin') {
      setIsAdmin(true)
      console.log("isAdmin")
    }
  }

  useEffect(() => {
    userVerify()
  }, [])
  return (
    <>
      {isAdmin && (
        <a href='/adminPages/gest-prod'>
          <svg className="w-11 h-11 mb-2 text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="#CBA3FB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"/>
          </svg>
        </a>
      )}
    </>
  )
}

export { BackAdmin }
