import os
from pathlib import Path
import fastapi as _fastapi
import fastapi.security as _security
import jwt as _jwt
import datetime as _dt
import sqlalchemy.orm as _orm
import passlib.hash as _hash
import database as _database, models as _models, schemas as _schemas

from dotenv import load_dotenv

load_dotenv()
env_path = Path(".") / ".env"
load_dotenv(dotenv_path=env_path)
JWT_SECRET = os.getenv("JWT_SECRET")

oauth2schema = _security.OAuth2PasswordBearer(tokenUrl="/api/token")


def create_database():
    return _database.Base.metadata.create_all(bind=_database.engine)


def get_db():
    db = _database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


async def get_user_by_email(email: str, db: _orm.Session):
    return db.query(_models.User).filter(_models.User.email == email).first()


async def create_user(user: _schemas.UserCreate, db: _orm.Session):
    user_obj = _models.User(
        email=user.email, hashed_password=_hash.bcrypt.hash(user.hashed_password)
    )
    db.add(user_obj)
    db.commit()
    db.refresh(user_obj)
    return user_obj


async def authenticate_user(email: str, password: str, db: _orm.Session):
    user = await get_user_by_email(db=db, email=email)

    if not user:
        return False

    if not user.verify_password(password):
        return False

    return user


async def create_token(user: _models.User):
    user_obj = _schemas.User.from_orm(user)

    token = _jwt.encode(user_obj.dict(), JWT_SECRET)

    return dict(access_token=token, token_type="bearer")


async def get_current_user(
    db: _orm.Session = _fastapi.Depends(get_db),
    token: str = _fastapi.Depends(oauth2schema),
):
    try:
        payload = _jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        user = db.query(_models.User).get(payload["id"])
    except:
        raise _fastapi.HTTPException(
            status_code=401, detail="Falsche E-Mail Adresse oder falsches Passwort."
        )

    return _schemas.User.from_orm(user)


async def create_contact(
    user: _schemas.User, db: _orm.Session, contact: _schemas.ContactCreate
):
    contact = _models.Contact(**contact.dict(), owner_id=user.id)
    db.add(contact)
    db.commit()
    db.refresh(contact)
    return _schemas.Contact.from_orm(contact)


async def get_contacts(user: _schemas.User, db: _orm.Session):
    contacts = db.query(_models.Contact).filter_by(owner_id=user.id)

    return list(map(_schemas.Contact.from_orm, contacts))


async def _contact_selector(contact_id: int, user: _schemas.User, db: _orm.Session):
    contact = (
        db.query(_models.Contact)
        .filter_by(owner_id=user.id)
        .filter(_models.Contact.id == contact_id)
        .first()
    )

    if contact is None:
        raise _fastapi.HTTPException(
            status_code=404, detail="Dieser Kontakt existiert nicht."
        )

    return contact


async def get_contact(contact_id: int, user: _schemas.User, db: _orm.Session):
    contact = await _contact_selector(contact_id=contact_id, user=user, db=db)

    return _schemas.Contact.from_orm(contact)


async def update_contact(contact_id: int, contact: _schemas.ContactCreate, user: _schemas.User, db: _orm.Session):
    contact_db = await _contact_selector(contact_id, user, db)
    contact_db.birthdate = contact.birthdate
    contact_db.city = contact.city
    contact_db.company = contact.company
    contact_db.deviantart = contact.deviantart
    contact_db.discord = contact.discord
    contact_db.dribble = contact.dribble
    contact_db.email = contact.email
    contact_db.facebook = contact.facebook
    contact_db.first_name = contact.first_name
    contact_db.flickr = contact.flickr
    contact_db.github = contact.github
    contact_db.gitlab = contact.gitlab
    contact_db.homepage = contact.homepage
    contact_db.instagram = contact.instagram
    contact_db.last_name = contact.last_name
    contact_db.linkedin = contact.linkedin
    contact_db.mastodon = contact.mastodon
    contact_db.netlify = contact.netlify
    contact_db.note = contact.note
    contact_db.phone = contact.phone
    contact_db.pinterest = contact.pinterest
    contact_db.reddit = contact.reddit
    contact_db.slack = contact.slack
    contact_db.spaces = contact.spaces
    contact_db.street = contact.street
    contact_db.thumblr = contact.thumblr
    contact_db.twitch = contact.twitch
    contact_db.twitter = contact.twitter
    contact_db.vercel = contact.vercel
    contact_db.vk = contact.vk
    contact_db.weibo = contact.weibo
    contact_db.wize = contact.wize
    contact_db.xing = contact.xing
    contact_db.youtube = contact.youtube
    contact_db.date_last_updated = _dt.datetime.utcnow()

    db.commit()
    db.refresh(contact_db)

    return _schemas.Contact.from_orm(contact_db)


async def delete_contact(contact_id: int, user: _schemas.User, db: _orm.Session):
    contact = await _contact_selector(contact_id, user, db)

    db.delete(contact)
    db.commit()
