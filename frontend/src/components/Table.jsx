import { useContext, useState, useEffect } from "react";
import moment from "moment";
import localization from "moment/locale/de";
import ErrorMessage from "./ErrorMessage";
import ContactModal from "./ContactModal";
import { UserContext } from "../context/UserContext";

const Table = () => {
  const [token] = useContext(UserContext);
  const [contacts, setContacts] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [id, setId] = useState(null);

  const handleUpdate = async (id) => {
    setId(id);
    setActiveModal(true);
  };

  const handleDelete = async (id) => {
    const reqOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const res = await fetch(`/api/contacts/${id}`, reqOptions);
    if (!res.ok) {
      setErrorMsg(
        "Oops, beim löschen des Kontaktes ist etwas in die Hose gegangen."
      );
    }
    getContacts();
  };

  const getContacts = async () => {
    const reqOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const res = await fetch("/api/contacts", reqOptions);

    if (!res.ok) {
      setErrorMsg(
        "Oops, irgend etwas ging gerade in die Hose. Konnte keine Kontakte laden."
      );
    } else {
      const data = await res.json();
      setContacts(data);
      setLoaded(true);
    }
  };
  useEffect(() => {
    getContacts();
  }, []);

  const handleModal = () => {
    setActiveModal(!activeModal);
    getContacts();
    setId(null);
  };
  return (
    <>
      <ContactModal
        active={activeModal}
        handleModal={handleModal}
        token={token}
        id={id}
        setErrorMsg={setErrorMsg}
      />
      <button
        className="button is-fullwidth mb-5 is-primary"
        onClick={() => setActiveModal(true)}
      >
        Kontakt erstellen
      </button>
      <ErrorMessage message={errorMsg} />
      {loaded && contacts ? (
        <div className="table-container">
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>Vorname</th>
                <th>Nachname</th>
                <th>Geburtstag</th>
                <th>
                  <span class="icon">
                    M<i class="fas fa-at"></i>il
                  </span>
                </th>
                <th>
                  <span class="icon">
                    <i class="fas fa-phone-alt"></i>
                  </span>
                </th>
                <th>Strasse</th>
                <th>Ort</th>
                <th>
                  <span class="icon">
                    <i class="fab fa-discord"></i>
                  </span>
                </th>
                <th>
                  <span class="icon">
                    <i class="fab fa-twitter"></i>
                  </span>
                </th>
                <th>
                  <span class="icon">
                    <i class="fab fa-facebook-f"></i>
                  </span>
                </th>
                <th>
                  <span class="icon">
                    <i class="fab fa-youtube"></i>
                  </span>
                </th>
                <th>
                  <span class="icon">
                    <i class="fab fa-linkedin"></i>
                  </span>
                </th>
                <th>
                  <span class="icon">
                    <i class="fas fa-globe"></i>
                  </span>
                </th>
                <th>
                  <span class="icon">
                    <i class="fas fa-building"></i>
                  </span>
                </th>
                <th>
                  <span class="icon">
                    <i class="fas fa-sticky-note"></i>
                  </span>
                </th>
                <th>
                  <span class="icon">
                    <i class="fas fa-stopwatch-20"></i>
                  </span>
                </th>
                <th>
                  <span class="icon">
                    <i class="fas fa-ellipsis-h"></i>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.first_name}</td>
                  <td>{contact.last_name}</td>
                  <td>{moment(contact.birthdate).format("ll")}</td>
                  <td>
                    <a href={"mailto:" + contact.email}>email</a>
                  </td>
                  <td>{contact.phone}</td>
                  <td>{contact.street}</td>
                  <td>{contact.city}</td>
                  <td>
                    <a
                      href={contact.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      discord
                    </a>
                  </td>
                  <td>
                    <a
                      href={contact.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      twitter
                    </a>
                  </td>
                  <td>
                    <a
                      href={contact.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      facebook
                    </a>
                  </td>
                  <td>
                    <a
                      href={contact.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      youtube
                    </a>
                  </td>
                  <td>
                    <a
                      href={contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      linkedin
                    </a>
                  </td>
                  <td>
                    <a
                      href={contact.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      webseite
                    </a>
                  </td>
                  <td>{contact.company}</td>
                  <td>{contact.note}</td>
                  <td>{moment(contact.date_last_updated).format("lll")}</td>
                  <td>
                    <div class="buttons are-normal">
                      <button
                        className="button mr-2 is-info is-light"
                        onClick={() => handleUpdate(contact.id)}
                      >
                        Bearbeiten
                      </button>
                      <button
                        className="button mr-2 is-danger is-light"
                        onClick={() => handleDelete(contact.id)}
                      >
                        Löschen
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Lade...</p>
      )}
    </>
  );
};

export default Table;
