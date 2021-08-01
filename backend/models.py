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

    leads = _orm.relationship("Lead", back_populates="owner")

    def verify_password(self, password: str):
        return _hash.bcrypt.verify(password, self.hashed_password)


class Lead(_database.Base):
    __tablename__ = "leads"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    owner_id = _sql.Column(_sql.Integer, _sql.ForeignKey("users.id"))
    first_name = _sql.Column(_sql.String, index=True)
    last_name = _sql.Column(_sql.String, index=True)
    birthdate = _sql.Column(_sql.Date, index=True, default="")
    email = _sql.Column(_sql.String, index=True)
    phone = _sql.Column(_sql.String, default="")
    street = _sql.Column(_sql.String, default="")
    city = _sql.Column(_sql.String, default="")
    discord = _sql.Column(_sql.String, default="")
    twitter = _sql.Column(_sql.String, default="")
    facebook = _sql.Column(_sql.String, default="")
    youtube = _sql.Column(_sql.String, default="")
    linkedin = _sql.Column(_sql.String, default="")
    homepage = _sql.Column(_sql.String, default="")
    company = _sql.Column(_sql.String, index=True, default="")
    note = _sql.Column(_sql.String, default="")
    date_created = _sql.Column(_sql.DateTime, default=_dt.datetime.utcnow)
    date_last_updated = _sql.Column(_sql.DateTime, default=_dt.datetime.utcnow)

    owner = _orm.relationship("User", back_populates="leads")
