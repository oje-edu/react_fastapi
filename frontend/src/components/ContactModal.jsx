import { useState, useEffect } from "react";

const ContactModal = ({ active, handleModal, token, id, setErrorMsg }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [note, setNote] = useState("");
  const [company, setCompany] = useState("");
  const [deviantart, setDeviantart] = useState("");
  const [discord, setDiscord] = useState("");
  const [dribble, setDribble] = useState("");
  const [facebook, setFacebook] = useState("");
  const [flickr, setFlickr] = useState("");
  const [github, setGithub] = useState("");
  const [gitlab, setGitlab] = useState("");
  const [homepage, setHomepage] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [mastodon, setMastodon] = useState("");
  const [netlify, setNetlify] = useState("");
  const [pinterest, setPinterest] = useState("");
  const [reddit, setReddit] = useState("");
  const [slack, setSlack] = useState("");
  const [spaces, setSpaces] = useState("");
  const [thumblr, setThumblr] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [twitch, setTwitch] = useState("");
  const [twitter, setTwitter] = useState("");
  const [vercel, setVercel] = useState("");
  const [vk, setVk] = useState("");
  const [weibo, setWeibo] = useState("");
  const [wize, setWize] = useState("");
  const [xing, setXing] = useState("");
  const [youtube, setYoutube] = useState("");

  useEffect(() => {
    const getContact = async () => {
      const reqOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const res = await fetch(
        `https://contact-api.noconcept.dev/api/contacts/${id}`,
        reqOptions
      );
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
        setNote(data.note);
        setCompany(data.company);
        setDeviantart(data.deviantart);
        setDiscord(data.discord);
        setDribble(data.dribble);
        setFacebook(data.facebook);
        setFlickr(data.flickr);
        setGithub(data.github);
        setGitlab(data.gitlab);
        setHomepage(data.homepage);
        setInstagram(data.instagram);
        setLinkedin(data.linkedin);
        setMastodon(data.mastodon);
        setNetlify(data.netlify);
        setPinterest(data.pinterest);
        setReddit(data.reddit);
        setSlack(data.slack);
        setSpaces(data.spaces);
        setThumblr(data.thumblr);
        setTiktok(data.tiktok);
        setTwitch(data.twitch);
        setTwitter(data.twitter);
        setVercel(data.vercel);
        setVk(data.vk);
        setWeibo(data.weibo);
        setWize(data.wize);
        setXing(data.xing);
        setYoutube(data.youtube);
      }
    };
    if (id) {
      getContact();
    }
  }, [id, token, setErrorMsg]);
  const clearFormData = () => {
    setFirstName("");
    setLastName("");
    setBirthdate("");
    setEmail("");
    setPhone("");
    setStreet("");
    setCity("");
    setNote("");
    setCompany("");
    setDeviantart("");
    setDiscord("");
    setDribble("");
    setFacebook("");
    setFlickr("");
    setGithub("");
    setGitlab("");
    setHomepage("");
    setInstagram("");
    setLinkedin("");
    setMastodon("");
    setNetlify("");
    setPinterest("");
    setReddit("");
    setSlack("");
    setSpaces("");
    setThumblr("");
    setTiktok("");
    setTwitch("");
    setTwitter("");
    setVercel("");
    setVk("");
    setWeibo("");
    setWize("");
    setXing("");
    setYoutube("");
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
        note: note,
        company: company,
        deviantart: deviantart,
        discord: discord,
        dribble: dribble,
        facebook: facebook,
        flickr: flickr,
        github: github,
        gitlab: gitlab,
        homepage: homepage,
        instagram: instagram,
        linkedin: linkedin,
        mastodon: mastodon,
        netlify: netlify,
        pinterest: pinterest,
        reddit: reddit,
        slack: slack,
        spaces: spaces,
        thumblr: thumblr,
        tiktok: tiktok,
        twitch: twitch,
        twitter: twitter,
        vercel: vercel,
        vk: vk,
        weibo: weibo,
        wize: wize,
        xing: xing,
        youtube: youtube,
      }),
    };
    const res = await fetch(
      "https://contact-api.noconcept.dev/api/contacts",
      reqOptions
    );
    console.log(res);
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
        note: note,
        company: company,
        deviantart: deviantart,
        discord: discord,
        dribble: dribble,
        facebook: facebook,
        flickr: flickr,
        github: github,
        gitlab: gitlab,
        homepage: homepage,
        instagram: instagram,
        linkedin: linkedin,
        mastodon: mastodon,
        netlify: netlify,
        pinterest: pinterest,
        reddit: reddit,
        slack: slack,
        spaces: spaces,
        thumblr: thumblr,
        tiktok: tiktok,
        twitch: twitch,
        twitter: twitter,
        vercel: vercel,
        vk: vk,
        weibo: weibo,
        wize: wize,
        xing: xing,
        youtube: youtube,
      }),
    };
    const res = await fetch(
      `https://contact-api.noconcept.dev/api/contacts/${id}`,
      reqOptions
    );
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
              <label className="label">Geburtstag</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Geburtstag eingeben (Bitte format beachten)"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  className="input"
                />
                <p className="help is-info">Format: YYYY-MM-DD</p>
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
              <label className="label">Strasse</label>
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
            {/* <div class="divider">
              <hr />
              <h5>Soziale Medien</h5>
            </div> */}
            <div className="field">
              <label className="label">DeviantArt</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="DeviantArt Adresse eingeben"
                  value={deviantart}
                  onChange={(e) => setDeviantart(e.target.value)}
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
              <label className="label">Dribble</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Dribble Adresse eingeben"
                  value={dribble}
                  onChange={(e) => setDribble(e.target.value)}
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
              <label className="label">Flickr</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Flickr Adresse eingeben"
                  value={flickr}
                  onChange={(e) => setFlickr(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Github</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="https://github.com/benutzername"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Gitlab</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="https://gitlab.com/benutzername"
                  value={gitlab}
                  onChange={(e) => setGitlab(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Instagram</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="https://instagram.com/benutzername"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
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
              <label className="label">Mastodon</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Mastodon Adresse eingeben"
                  value={mastodon}
                  onChange={(e) => setMastodon(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Netlify</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Netlify Adresse eingeben"
                  value={netlify}
                  onChange={(e) => setNetlify(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Pinterest</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Pinterest Adresse eingeben"
                  value={pinterest}
                  onChange={(e) => setPinterest(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Reddit</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Reddit Adresse eingeben"
                  value={reddit}
                  onChange={(e) => setReddit(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Slack</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Slack Adresse eingeben"
                  value={slack}
                  onChange={(e) => setSlack(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Spaces</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Spaces Adresse eingeben"
                  value={spaces}
                  onChange={(e) => setSpaces(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Thumblr</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Thumblr Adresse eingeben"
                  value={thumblr}
                  onChange={(e) => setThumblr(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">TikTok</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="TikTok Adresse eingeben"
                  value={tiktok}
                  onChange={(e) => setTiktok(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Twitch</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Twitch Adresse eingeben"
                  value={twitch}
                  onChange={(e) => setTwitch(e.target.value)}
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
              <label className="label">Vercel</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="https://vercel.com/benutzername"
                  value={vercel}
                  onChange={(e) => setVercel(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Vk</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Vk Adresse eingeben"
                  value={vk}
                  onChange={(e) => setVk(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Weibo</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Weibo Adresse eingeben"
                  value={weibo}
                  onChange={(e) => setWeibo(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Wize</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Wize Adresse eingeben"
                  value={wize}
                  onChange={(e) => setWize(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Xing</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Xing Adresse eingeben"
                  value={xing}
                  onChange={(e) => setXing(e.target.value)}
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
