import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import ErrorMessage from "./ErrorMessage";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [, setToken] = useContext(UserContext);

  const submitRegistration = async () => {
    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, hashed_password: password }),
    };
    const res = await fetch(
      "https://contact-api.noconcept.dev/api/users",
      reqOptions
    );
    const data = await res.json();

    if (!res.ok) {
      setErrMsg(data.detail);
    } else {
      setToken(data.access_token);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword && password.length >= 8) {
      submitRegistration();
    } else {
      setErrMsg(
        "Stelle sicher das deine Passwörter übereinstimmen und das Passwort mindestens 8 Zeichen lang ist."
      );
    }
  };

  return (
    <div className="column">
      <form className="box" onSubmit={handleSubmit}>
        <h1 className="title has-tet-centered">Registrieren</h1>
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
        <div className="field">
          <label htmlFor="confirmPassword" className="label">
            Passwort wiederholen
          </label>
          <div className="control">
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Gib das Passwort erneut ein."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <ErrorMessage message={errMsg} />
        <br />
        <button className="button is-primary" type="submit">
          Registrieren
        </button>
      </form>
    </div>
  );
};

export default Register;
