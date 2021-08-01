from typing import List
import fastapi as _fastapi
import fastapi.security as _security
import sqlalchemy.orm as _orm
import services as _services
import schemas as _schemas

description = """
This Contacts API helps you to Manage your Buddys. 🚀

## Users

After Login You will be able to:

* **Create Own Contacts**.
* **Read Your Own Contacts**.
* **Update Your Own Contacts**.
* **Delete Your Own Contacts**.
"""

tags_metadata = [
    {
        "name": "users",
        "description": "The **create** and **login** logic.",
    },
    {
        "name": "contacts",
        "description": "Manage your contacts.",
        # "externalDocs": {
        #     "description": "Items external docs",
        #     "url": "https://fastapi.tiangolo.com/",
        # },
    },
]


app = _fastapi.FastAPI(
    title="ContactsAPI",
    description=description,
    openapi_tags=tags_metadata,
    version="0.0.1",
    contact={
        "name": "The Noconcept Dev",
        "url": "https://the.noconcept.dev",
        "email": "the@noconcept.dev",
    },
    license_info={
        "name": "Apache 2.0",
        "url": "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
)


@app.post("/api/users", tags=["users"])
async def create_user(
    user: _schemas.UserCreate, db: _orm.Session = _fastapi.Depends(_services.get_db)
):
    db_user = await _services.get_user_by_email(user.email, db)
    if db_user:
        raise _fastapi.HTTPException(
            status_code=400, detail="Diese E-Mail Adresse wird bereits verwendet."
        )
    await _services.create_user(user, db)

    return await _services.create_token(user)


@app.post("/api/token", tags=["users"])
async def generate_token(
    form_data: _security.OAuth2PasswordRequestForm = _fastapi.Depends(),
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    user = await _services.authenticate_user(form_data.username, form_data.password, db)

    if not user:
        raise _fastapi.HTTPException(
            status_code=401, detail="Ungültige Anmeldeinformationen"
        )
    return await _services.create_token(user)


@app.get("/api/users/me", tags=["users"], response_model=_schemas.User)
async def get_user(user: _schemas.User = _fastapi.Depends(_services.get_current_user)):
    return user


@app.post("/api/contacts", tags=["contacts"], response_model=_schemas.Lead)
async def create_contact(
    lead: _schemas.LeadCreate,
    user: _schemas.User = _fastapi.Depends(_services.get_current_user),
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.create_contact(user=user, db=db, lead=lead)


@app.get("/api/contacts", tags=["contacts"], response_model=List[_schemas.Lead])
async def get_contacts(
    user: _schemas.User = _fastapi.Depends(_services.get_current_user),
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_contacts(user=user, db=db)


@app.get("/api/contacts/{contact_id}", tags=["contacts"], status_code=200)
async def get_contact(
    contact_id: int,
    user: _schemas.User = _fastapi.Depends(_services.get_current_user),
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_contact(contact_id, user, db)


@app.put("/api/contacts/{contact_id}", tags=["contacts"], status_code=200)
async def update_contact(
    contact_id: int,
    lead: _schemas.LeadCreate,
    user: _schemas.User = _fastapi.Depends(_services.get_current_user),
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    await _services.update_contact(contact_id, lead, user, db)
    return {"message", "Die Änderungen wurden übernommen."}


@app.delete("/api/contacts/{contact_id}", tags=["contacts"], status_code=204)
async def delete_contact(
    contact_id: int,
    user: _schemas.User = _fastapi.Depends(_services.get_current_user),
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    await _services.delete_contact(contact_id, user, db)
    return {"message", "Der Kontakt wurde gelöscht."}


@app.get("/api")
async def root():
    return {"message": "ContactsAPI root endpoint"}
