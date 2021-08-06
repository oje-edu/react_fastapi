import { useState, useEffect, useContext } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Header from "./components/Header";
import Table from "./components/Table";
import { UserContext } from "./context/UserContext";

const App = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState("");
  const [token] = useContext(UserContext);

  const getWelcomeMsg = async () => {
    const reqOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch("/api", reqOptions);
    const data = await res.json();

    if (!res.ok) {
      console.log("Oops.. irgendwas ging schief.");
    } else {
      setMessage(data.message);
    }
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  useEffect(() => {
    getWelcomeMsg();
  }, []);

  return (
    <>
      <Header title={message} />
      <div className="container is-fluid">
        {!token ? (
          <div className="container">
            {isSignup ? (
              <div>
                <Register />
                <button
                  className="button is-secondary is-center"
                  onClick={switchMode}
                >
                  Bereits registriert? Einloggen
                </button>
              </div>
            ) : (
              <div>
                <Login />
                <button className="button is-secondary" onClick={switchMode}>
                  Noch nicht registriert? Konto erstellen
                </button>
              </div>
            )}
          </div>
        ) : (
          <Table />
        )}
      </div>
    </>
  );
};

export default App;
