import datetime as _dt
import sqlalchemy as _sql
import sqlalchemy.orm as _orm
import passlib.hash as _hash

import database as _database


class User(_database.Base):
    __tablename__ = "users"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    email = _sql.Column(_sql.String, unique=True, index=True)
    hashed_password = _sql.Column(_sql.String)

    contacts = _orm.relationship("Contact", back_populates="owner")

    def verify_password(self, password: str):
        return _hash.bcrypt.verify(password, self.hashed_password)


class Contact(_database.Base):
    __tablename__ = "contacts"
    id=_sql.Column(_sql.Integer, primary_key=True, index=True)
    owner_id=_sql.Column(_sql.Integer, _sql.ForeignKey("users.id"))
    birthdate=_sql.Column(_sql.Date,index=True,default="")
    city=_sql.Column(_sql.String,default="")
    company=_sql.Column(_sql.String,index=True,default="")
    deviantart=_sql.Column(_sql.String,default="")
    discord=_sql.Column(_sql.String,default="")
    dribble=_sql.Column(_sql.String,default="")
    email=_sql.Column(_sql.String,index=True)
    facebook=_sql.Column(_sql.String,default="")
    first_name=_sql.Column(_sql.String,index=True)
    flickr=_sql.Column(_sql.String,default="")
    github=_sql.Column(_sql.String,default="")
    gitlab=_sql.Column(_sql.String,default="")
    homepage=_sql.Column(_sql.String,default="")
    instagram=_sql.Column(_sql.String,default="")
    last_name=_sql.Column(_sql.String,index=True)
    linkedin=_sql.Column(_sql.String,default="")
    mastodon=_sql.Column(_sql.String,default="")
    netlify=_sql.Column(_sql.String,default="")
    note=_sql.Column(_sql.String,default="")
    phone=_sql.Column(_sql.String,default="")
    pinterest=_sql.Column(_sql.String,default="")
    reddit=_sql.Column(_sql.String,default="")
    slack=_sql.Column(_sql.String,default="")
    spaces=_sql.Column(_sql.String,default="")
    street=_sql.Column(_sql.String,default="")
    thumblr=_sql.Column(_sql.String,default="")
    tiktok=_sql.Column(_sql.String,default="")
    twitch=_sql.Column(_sql.String,default="")
    twitter=_sql.Column(_sql.String,default="")
    vercel=_sql.Column(_sql.String,default="")
    vk=_sql.Column(_sql.String,default="")
    weibo=_sql.Column(_sql.String,default="")
    wize=_sql.Column(_sql.String,default="")
    xing=_sql.Column(_sql.String,default="")
    youtube=_sql.Column(_sql.String,default="")
    date_created=_sql.Column(_sql.DateTime, default=_dt.datetime.utcnow)
    date_last_updated=_sql.Column(_sql.DateTime, default=_dt.datetime.utcnow)

    owner=_orm.relationship("User", back_populates="contacts")
