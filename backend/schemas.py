import datetime as _dt
import pydantic as _pydantic


class _UserBase(_pydantic.BaseModel):
    email: str


class UserCreate(_UserBase):
    hashed_password: str

    class Config:
        orm_mode = True


class User(_UserBase):
    id: int

    class Config:
        orm_mode = True


class _ContactBase(_pydantic.BaseModel):
    birthdate: _dt.date
    city: str
    company: str
    deviantart: str
    discord: str
    dribble: str
    email: str
    facebook: str
    first_name: str
    flickr: str
    github: str
    gitlab: str
    homepage: str
    instagram: str
    last_name: str
    linkedin: str
    mastodon: str
    netlify: str
    note: str
    phone: str
    pinterest: str
    reddit: str
    slack: str
    spaces: str
    street: str
    thumblr: str
    tiktok: str
    twitch: str
    twitter: str
    vercel: str
    vk: str
    weibo: str
    wize: str
    xing: str
    youtube: str

class ContactCreate(_ContactBase):
    pass


class Contact(_ContactBase):
    id: int
    owner_id: int
    date_created: _dt.datetime
    date_last_updated: _dt.datetime

    class Config:
        orm_mode = True
