import { createContext, useEffect, useState } from "react"

export const UserContext = createContext()

export const UserProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("thenoconceptdevKontaktToken"))

  useEffect(() => {
    const fetchUser = async () => {
      const reqOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + token,
        },
      }
      const res = await fetch('/api/users/me', reqOptions)
      if (!res.ok) {
        setToken(null)
      }
      localStorage.setItem("thenoconceptdevKontaktToken", token)
    }
    fetchUser()
  }, [token])
  return (
    <UserContext.Provider value={[token, setToken]}>
      {props.children}
    </UserContext.Provider>
  )
}