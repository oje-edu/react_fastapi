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
      <div className="columns">
        <div className="column"></div>
        <div className="column m-5 is-two-thirds">
          {!token ? (
            <div className="columns">
              {isSignup ? <Register /> : <Login />}
              <button className="button is-secondary" onClick={switchMode}>
                {isSignup
                  ? "Bereits registriert? Einloggen"
                  : "Noch nicht registriert? Konto erstellen"}
              </button>
            </div>
          ) : (
            <Table />
          )}
        </div>
        <div className="column"></div>
      </div>
    </>
  );
};

export default App;
