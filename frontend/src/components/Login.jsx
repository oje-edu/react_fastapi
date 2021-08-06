import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import ErrorMessage from "./ErrorMessage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [, setToken] = useContext(UserContext);

  const submitLogin = async () => {
    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded " },
      body: JSON.stringify(
        `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`
      ),
    };
    const res = await fetch("/api/token", reqOptions);
    const data = await res.json();

    if (!res.ok) {
      setErrMsg(data.detail);
    } else {
      setToken(data.access_token);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogin();
  };

  return (
    <div className="column">
      <form className="box" onSubmit={handleSubmit}>
        <h1 className="title has-tet-centered">Einloggen</h1>
        <div className="field">
          <label htmlFor="email" className="label">
            E-Mail Adresse
          </label>
          <div className="control">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Deine E-Mail Adresse"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="password" className="label">
            Passwort
          </label>
          <div className="control">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Gib ein Passwort ein"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <ErrorMessage message={errMsg} />
        <br />
        <button className="button is-primary" type="submit">
          Einloggen
        </button>
      </form>
    </div>
  );
};

export default Login;
