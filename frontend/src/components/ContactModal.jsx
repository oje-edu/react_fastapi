import { useState, useEffect } from "react";

const ContactModal = ({ active, handleModal, token, id, setErrorMsg }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [discord, setDiscord] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [youtube, setYoutube] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [homepage, setHomepage] = useState("");
  const [company, setCompany] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    const getContact = async () => {
      const reqOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const res = await fetch(`/api/contacts/${id}`, reqOptions);
      if (!res.ok) {
        setErrorMsg(
          "Opps, beim holen der Kontaktdaten ist etwas in die Hose gegangen."
        );
      } else {
        const data = await res.json();
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setBirthdate(data.birthdate);
        setEmail(data.email);
        setPhone(data.phone);
        setStreet(data.street);
        setCity(data.city);
        setDiscord(data.discord);
        setTwitter(data.twitter);
        setFacebook(data.facebook);
        setYoutube(data.youtube);
        setLinkedin(data.linkedin);
        setHomepage(data.homepage);
        setCompany(data.company);
        setNote(data.note);
      }
    };
    if (id) {
      getContact();
    }
  }, [id, token]);
  const clearFormData = () => {
    setFirstName("");
    setLastName("");
    setBirthdate("");
    setEmail("");
    setPhone("");
    setStreet("");
    setCity("");
    setDiscord("");
    setTwitter("");
    setFacebook("");
    setYoutube("");
    setLinkedin("");
    setHomepage("");
    setCompany("");
    setNote("");
  };

  const handleCreateContact = async (e) => {
    e.preventDefault();
    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        birthdate: birthdate,
        email: email,
        phone: phone,
        street: street,
        city: city,
        discord: discord,
        twitter: twitter,
        facebook: facebook,
        youtube: youtube,
        linkedin: linkedin,
        homepage: homepage,
        company: company,
        note: note,
      }),
    };
    const res = await fetch("/api/contacts", reqOptions);
    if (!res.ok) {
      setErrorMsg(
        "Oops, irgend etwas ging bei der Erstellung des Kontaktes in die Hose"
      );
    } else {
      clearFormData();
      handleModal();
    }
  };

  const handleUpdateContact = async (e) => {
    e.preventDefault();
    const reqOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        birthdate: birthdate,
        email: email,
        phone: phone,
        street: street,
        city: city,
        discord: discord,
        twitter: twitter,
        facebook: facebook,
        youtube: youtube,
        linkedin: linkedin,
        homepage: homepage,
        company: company,
        note: note,
      }),
    };
    const res = await fetch(`/api/contacts/${id}`, reqOptions);
    if (!res.ok) {
      setErrorMsg(
        "Oops, beim bearbeiten des Kontaktes ist etwas in die Hose gegangen."
      );
    } else {
      clearFormData();
      handleModal();
    }
  };

  return (
    <div className={`modal ${active && "is-active"}`}>
      <div className="modal-background" onClick={handleModal}></div>
      <div className="modal-card">
        <header className="modal-card-head has-background-primary-light">
          <h1 className="modal-card-title">
            {id ? "Kontakt bearbeiten" : "Kontakt erstellen"}
          </h1>
        </header>
        <section className="modal-card-body">
          <form>
            <div className="field">
              <label className="label">Vorname*</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Vornamen eingeben"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Nachname*</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Nachnamen eingeben"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">E-Mail</label>
              <div className="control">
                <input
                  type="email"
                  placeholder="E-Mail Adresse eingeben"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Geburtstag</label>
              <div className="control">
                <input
                  type="date"
                  placeholder="Geburtsdatum auswählen"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Telefon-Nr.</label>
              <div className="control">
                <input
                  type="tel"
                  placeholder="Telefon-Nr. eingeben"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Telefon-Nr.</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Strasse eingeben"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Ort</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="PLZ Wohnort eingeben "
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Discord</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Discord Adresse: Benutzername#1234"
                  value={discord}
                  onChange={(e) => setDiscord(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Twitter</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="https://twitter.com/benutzername"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Facebook</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="https://facebook.com/benutzername"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Youtube</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="https://www.youtube.com/channel/... "
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">LinkedIn</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="https://linkedin.com/in/benutzername"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Webseite</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Webseiten Adresse eingeben "
                  value={homepage}
                  onChange={(e) => setHomepage(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Webseite</label>
              <div className="control has-icons-left">
                <input
                  type="text"
                  placeholder="Webseiten Adresse eingeben "
                  value={homepage}
                  onChange={(e) => setHomepage(e.target.value)}
                  className="input"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-globe"></i>
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label">Firma</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Firma eingeben"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Bemerkung</label>
              <div className="control">
                <input
                  type="textarea"
                  placeholder="Anmerkungen"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="textarea"
                />
              </div>
            </div>
          </form>
        </section>
        <footer className="modal-card-foot has-background-primary-light">
          {id ? (
            <button className="button is-info" onClick={handleUpdateContact}>
              Bearbeiten
            </button>
          ) : (
            <button className="button is-primary" onClick={handleCreateContact}>
              Erstellen
            </button>
          )}
          <button className="button" onClick={handleModal}>
            Abbrechen
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ContactModal;
