import { useState, useEffect, useContext } from 'react'
import Register from './components/Register'
import Header from './components/Header'
import { UserContext } from './context/UserContext'

const App = () => {

  const [message, setMessage] = useState('')
  const [token] = useContext(UserContext)

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
      console.log('Oops.. irgendwas ging schief.')
    } else {
      setMessage(data.message)
    }
  }

  useEffect(() => {
    getWelcomeMsg()
  }, [])

  return (
    <>
      <Header title={message} />
      <div className='columns'>
        <div className='column'></div>
        <div className='column m-5 is-two-thirds'>
          {
            !token ? (
              <div className='columns'>
                <Register /> <p>Einloggen</p>
              </div>
            ) : (
              <p>Table</p>
            )
          }
        </div>
        <div className='column'></div>
      </div>
    </>
  );
}

export default App;
