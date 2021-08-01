import { useState, useEffect } from 'react'

const App = () => {

  const [message, setMessage] = useState('')

  const getWelcomeMsg = async () => {
    const reqOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }
    const res = await fetch('/api', reqOptions)
    const data = await res.json()

    if (!res.ok) {
      console.log("Oops.. irgendwas ging schief.")
    } else {
      setMessage(data.message)
    }
  }

  useEffect(() => {
    getWelcomeMsg()
  }, [])

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
